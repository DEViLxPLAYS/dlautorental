import { useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "@/providers/trpc";
import {
  LogIn,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Car,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
  X,
  Check,
  ImageIcon,
} from "lucide-react";

const carTypes = ["sedan", "suv", "truck", "luxury", "sports"] as const;

export default function Admin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCar, setEditingCar] = useState<number | null>(null);

  // Admin auth check
  const { data: adminData, refetch: refetchAdmin } =
    trpc.admin.verify.useQuery(undefined, { throwOnError: false, retry: false });
  const isAdmin = adminData?.isAdmin ?? false;

  // Cars data
  const { data: carsData, refetch: refetchCars } = trpc.car.list.useQuery(
    { limit: 100 },
    { enabled: isAdmin }
  );
  const { data: rentalsData } = trpc.rental.list.useQuery(undefined, {
    enabled: isAdmin,
  });

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("adminToken", data.token);
      setLoginError("");
      refetchAdmin();
    },
    onError: (err) => {
      setLoginError(err.message);
    },
  });

  const createCarMutation = trpc.car.create.useMutation({
    onSuccess: () => {
      refetchCars();
      setShowAddModal(false);
      resetForm();
    },
  });

  const updateCarMutation = trpc.car.update.useMutation({
    onSuccess: () => {
      refetchCars();
      setEditingCar(null);
      resetForm();
    },
  });

  const deleteCarMutation = trpc.car.delete.useMutation({
    onSuccess: () => {
      refetchCars();
    },
  });

  const [form, setForm] = useState({
    name: "",
    brand: "",
    year: new Date().getFullYear(),
    type: "sedan" as (typeof carTypes)[number],
    pricePerDay: "",
    discountedPrice: "",
    imageUrl: "",
    description: "",
    features: "",
    isDiscounted: false,
  });

  function resetForm() {
    setForm({
      name: "",
      brand: "",
      year: new Date().getFullYear(),
      type: "sedan",
      pricePerDay: "",
      discountedPrice: "",
      imageUrl: "",
      description: "",
      features: "",
      isDiscounted: false,
    });
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    loginMutation.mutate({ username, password });
  }

  function handleSubmitCar(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      ...form,
      features: form.features
        ? form.features.split(",").map((f) => f.trim())
        : [],
    };
    if (editingCar) {
      updateCarMutation.mutate({ id: editingCar, ...data });
    } else {
      createCarMutation.mutate(data);
    }
  }

  function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this car?")) {
      deleteCarMutation.mutate({ id });
    }
  }

  function handleEdit(car: (typeof defaultCars)[0]) {
    setForm({
      name: car.name,
      brand: car.brand,
      year: car.year,
      type: car.type as (typeof carTypes)[number],
      pricePerDay: String(car.pricePerDay),
      discountedPrice: car.discountedPrice ? String(car.discountedPrice) : "",
      imageUrl: car.imageUrl,
      description: car.description || "",
      features: Array.isArray(car.features)
        ? (car.features as string[]).join(", ")
        : "",
      isDiscounted: car.isDiscounted ?? false,
    });
    setEditingCar(car.id);
    setShowAddModal(true);
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    refetchAdmin();
    navigate("/");
  }

  // Show login form if not admin
  if (!isAdmin) {
    return (
      <main className="min-h-screen bg-[#f1f1f1] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Car size={40} className="text-[#D4A03A] mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-black mb-1">
              Admin Portal
            </h1>
            <p className="text-sm text-black/40">
              DL Auto Rental Management
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs">
                  <AlertCircle size={14} />
                  {loginError}
                </div>
              )}
              <div>
                <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                  placeholder="Enter password"
                />
              </div>
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="flex items-center justify-center gap-2 w-full bg-black text-white text-xs uppercase tracking-[0.08em] font-medium py-4 rounded-full hover:bg-[#D4A03A] transition-colors disabled:opacity-50"
              >
                <LogIn size={14} />
                {loginMutation.isPending ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-black/5">
              <p className="text-[10px] text-center text-black/30">
                Default credentials: dlautorental / dlautorental@1
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 text-center text-xs text-black/40 hover:text-black transition-colors"
          >
            Back to Website
          </button>
        </div>
      </main>
    );
  }

  // Dashboard
  const cars = carsData?.cars ?? [];
  const rentals = rentalsData ?? [];
  const totalRevenue = rentals.reduce(
    (sum, r) => sum + Number(r.totalPrice),
    0
  );

  return (
    <main className="min-h-screen bg-[#f1f1f1]">
      {/* Header */}
      <header className="bg-black text-white px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Car size={24} className="text-[#D4A03A]" />
          <div>
            <h1 className="text-sm font-semibold">DL Auto Rental</h1>
            <p className="text-[10px] text-white/40">Admin Dashboard</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </header>

      <div className="px-6 md:px-12 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5">
            <Car size={20} className="text-[#D4A03A] mb-3" />
            <p className="text-2xl font-bold text-black">{cars.length}</p>
            <p className="text-xs text-black/40 uppercase tracking-wider">
              Total Cars
            </p>
          </div>
          <div className="bg-white rounded-xl p-5">
            <Users size={20} className="text-[#D4A03A] mb-3" />
            <p className="text-2xl font-bold text-black">{rentals.length}</p>
            <p className="text-xs text-black/40 uppercase tracking-wider">
              Total Rentals
            </p>
          </div>
          <div className="bg-white rounded-xl p-5">
            <DollarSign size={20} className="text-[#D4A03A] mb-3" />
            <p className="text-2xl font-bold text-black">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-xs text-black/40 uppercase tracking-wider">
              Revenue
            </p>
          </div>
          <div className="bg-white rounded-xl p-5">
            <TrendingUp size={20} className="text-[#D4A03A] mb-3" />
            <p className="text-2xl font-bold text-black">
              {cars.filter((c) => c.isDiscounted).length}
            </p>
            <p className="text-xs text-black/40 uppercase tracking-wider">
              Discounted
            </p>
          </div>
        </div>

        {/* Cars Section */}
        <div className="bg-white rounded-xl overflow-hidden">
          <div className="p-5 border-b border-black/5 flex items-center justify-between">
            <h2 className="font-semibold text-black">Fleet Management</h2>
            <button
              onClick={() => {
                setEditingCar(null);
                resetForm();
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 bg-[#D4A03A] text-black text-xs uppercase tracking-[0.08em] font-medium px-4 py-2.5 rounded-full hover:bg-[#B8832F] transition-colors"
            >
              <Plus size={14} />
              Add Car
            </button>
          </div>

          {/* Cars Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#f1f1f1]/50">
                  <th className="text-left text-xs text-black/40 uppercase tracking-wider font-medium px-5 py-3">
                    Car
                  </th>
                  <th className="text-left text-xs text-black/40 uppercase tracking-wider font-medium px-5 py-3">
                    Brand
                  </th>
                  <th className="text-left text-xs text-black/40 uppercase tracking-wider font-medium px-5 py-3">
                    Type
                  </th>
                  <th className="text-left text-xs text-black/40 uppercase tracking-wider font-medium px-5 py-3">
                    Price/Day
                  </th>
                  <th className="text-left text-xs text-black/40 uppercase tracking-wider font-medium px-5 py-3">
                    Status
                  </th>
                  <th className="text-right text-xs text-black/40 uppercase tracking-wider font-medium px-5 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr
                    key={car.id}
                    className="border-b border-black/5 hover:bg-[#f1f1f1]/30 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#f1f1f1] overflow-hidden flex-shrink-0">
                          {car.imageUrl ? (
                            <img
                              src={car.imageUrl}
                              alt={car.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon
                              size={16}
                              className="text-black/20 m-auto mt-2.5"
                            />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">
                            {car.name}
                          </p>
                          <p className="text-[10px] text-black/40">
                            {car.year}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-black/60">
                      {car.brand}
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-[10px] uppercase tracking-wider bg-[#f1f1f1] px-2 py-1 rounded-full text-black/50">
                        {car.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm font-medium text-[#D4A03A]">
                      ${car.pricePerDay}
                    </td>
                    <td className="px-5 py-3">
                      {car.isDiscounted && (
                        <span className="text-[10px] uppercase tracking-wider bg-[#D4A03A]/10 text-[#D4A03A] px-2 py-1 rounded-full">
                          Special
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(car as unknown as (typeof defaultCars)[0])}
                          className="w-8 h-8 rounded-full bg-[#f1f1f1] flex items-center justify-center hover:bg-[#D4A03A]/20 transition-colors"
                        >
                          <Edit3 size={12} className="text-black/60" />
                        </button>
                        <button
                          onClick={() => handleDelete(car.id)}
                          className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center hover:bg-red-100 transition-colors"
                        >
                          <Trash2 size={12} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {cars.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-sm text-black/30">
                      No cars in the database yet. Click &quot;Add Car&quot; to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Car Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowAddModal(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-black">
                {editingCar ? "Edit Car" : "Add New Car"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-[#f1f1f1] flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSubmitCar} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                    placeholder="e.g., Ford Fusion"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Brand
                  </label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) =>
                      setForm({ ...form, brand: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                    placeholder="e.g., Ford"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Year
                  </label>
                  <input
                    type="number"
                    required
                    value={form.year}
                    onChange={(e) =>
                      setForm({ ...form, year: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as (typeof carTypes)[number],
                      })
                    }
                    className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                  >
                    {carTypes.map((t) => (
                      <option key={t} value={t}>
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Price/Day ($)
                  </label>
                  <input
                    type="text"
                    required
                    value={form.pricePerDay}
                    onChange={(e) =>
                      setForm({ ...form, pricePerDay: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                    placeholder="e.g., 57"
                  />
                </div>
                <div>
                  <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                    Weekly Special ($)
                  </label>
                  <input
                    type="text"
                    value={form.discountedPrice}
                    onChange={(e) =>
                      setForm({ ...form, discountedPrice: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                    placeholder="Optional"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                  Image URL
                </label>
                <input
                  type="text"
                  required
                  value={form.imageUrl}
                  onChange={(e) =>
                    setForm({ ...form, imageUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30 resize-none"
                  placeholder="Brief description of the vehicle..."
                />
              </div>

              <div>
                <label className="text-xs text-black/50 uppercase tracking-wider mb-1.5 block">
                  Features (comma-separated)
                </label>
                <input
                  type="text"
                  value={form.features}
                  onChange={(e) =>
                    setForm({ ...form, features: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-[#f1f1f1] rounded-xl text-sm border-none outline-none focus:ring-2 focus:ring-[#D4A03A]/30"
                  placeholder="5 Seats, Automatic, Bluetooth..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDiscounted"
                  checked={form.isDiscounted}
                  onChange={(e) =>
                    setForm({ ...form, isDiscounted: e.target.checked })
                  }
                  className="rounded border-black/20"
                />
                <label
                  htmlFor="isDiscounted"
                  className="text-sm text-black/60"
                >
                  Mark as discounted (weekly special)
                </label>
              </div>

              <button
                type="submit"
                disabled={
                  createCarMutation.isPending || updateCarMutation.isPending
                }
                className="flex items-center justify-center gap-2 w-full bg-black text-white text-xs uppercase tracking-[0.08em] font-medium py-4 rounded-full hover:bg-[#D4A03A] transition-colors disabled:opacity-50"
              >
                <Check size={14} />
                {editingCar
                  ? "Update Car"
                  : createCarMutation.isPending
                  ? "Adding..."
                  : "Add Car"}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

const defaultCars = [] as {
  id: number;
  name: string;
  brand: string;
  year: number;
  type: string;
  pricePerDay: string;
  discountedPrice?: string;
  imageUrl: string;
  description: string;
  features: string[];
  isDiscounted: boolean;
  isAvailable: boolean;
}[];
