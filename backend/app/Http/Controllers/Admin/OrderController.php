<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('product')->latest()->paginate(15);
        return view('admin.orders.index', compact('orders'));
    }

    public function show(Order $order)
    {
        if ($order->status === 'new') {
            $order->update(['status' => 'viewed']);
        }

        return view('admin.orders.show', compact('order'));
    }

    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => 'required|in:new,viewed,completed,cancelled',
        ]);

        $order->update($data);

        return redirect()->route('admin.orders.index')->with('success', 'تم تحديث حالة الطلب');
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return redirect()->route('admin.orders.index')->with('success', 'تم حذف الطلب');
    }
}
