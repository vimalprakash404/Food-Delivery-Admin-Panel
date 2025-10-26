import { Request, Response } from "express";
import { User } from "../models/user";
import { Product } from "../models/product";
import { Order } from "../models/order";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const recentOrders = await Order.find()
      .sort({ orderDate: -1 })
      .limit(10)
      .populate("userId", "name")
      .select("_id totalAmount orderDate userId");

    const revenueStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          averageOrderValue: { $avg: "$totalAmount" },
        },
      },
    ]);

    const totalRevenue = revenueStats.length > 0 ? revenueStats[0].totalRevenue : 0;
    const averageOrderValue = revenueStats.length > 0 ? revenueStats[0].averageOrderValue : 0;

    const itemsStats = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: null,
          totalItemsSold: { $sum: "$items.quantity" },
        },
      },
    ]);

    const totalItemsSold = itemsStats.length > 0 ? itemsStats[0].totalItemsSold : 0;

    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalQuantity: { $sum: "$items.quantity" },
          totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 1,
          name: "$product.name",
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
    ]);

    const productStatusBreakdown = await Product.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const recentOrdersCount = await Order.countDocuments({
      orderDate: {
        $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    });

    const recentRevenue = await Order.aggregate([
      {
        $match: {
          orderDate: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$totalAmount" },
        },
      },
    ]);

    const last7DaysRevenue = recentRevenue.length > 0 ? recentRevenue[0].revenue : 0;

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      averageOrderValue,
      totalItemsSold,
      topProducts,
      productStatusBreakdown,
      recentOrdersCount,
      last7DaysRevenue,
      recentOrders,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
