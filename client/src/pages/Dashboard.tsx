import { useEffect, useState } from "react";
import API from "../services/api";

interface Lead {
  _id: string;
  name: string;
  email: string;
  status: string;
  source: string;
}


import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("New");
  const [source, setSource] = useState("Website");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // Fetch Leads
  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("No token found. Please login again.");
        navigate("/");
        return;
      }
      const res = await API.get(
        `/leads?search=${search}&status=${filterStatus}&source=${filterSource}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLeads(res.data.leads);
      setErrorMsg("");
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message || "Failed to load leads. Please try again."
      );
      setLeads([]);
    }
  };

  // Create Lead
  const handleCreateLead = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      await API.post(
        "/leads",
        {
          name,
          email,
          status,
          source,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Lead Created");

      setShowModal(false);

      setName("");
      setEmail("");
      setStatus("New");
      setSource("Website");

      fetchLeads();
    } catch (error) {
      console.log(error);
    }
  };

  // Debounced Search
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchLeads();
    }, 500);

    return () =>
      clearTimeout(delay);
  }, [
    search,
    filterStatus,
    filterSource,
  ]);

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      }}
    >
      {errorMsg && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {errorMsg}
        </div>
      )}
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Smart Leads Dashboard
        </h1>

        <div className="flex gap-3">
          <button
            onClick={() =>
              setShowModal(true)
            }
            className="bg-black text-white px-5 py-2 rounded-lg"
          >
            Add Lead
          </button>

          <button
            onClick={() => {
              localStorage.removeItem(
                "token"
              );

              window.location.href =
                "/";
            }}
            className="bg-red-500 text-white px-5 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Name or Email"
          className="border p-3 rounded-lg w-full"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          className="border p-3 rounded-lg"
          value={filterStatus}
          onChange={(e) =>
            setFilterStatus(
              e.target.value
            )
          }
        >
          <option value="">
            All Status
          </option>

          <option value="New">
            New
          </option>

          <option value="Contacted">
            Contacted
          </option>

          <option value="Qualified">
            Qualified
          </option>

          <option value="Lost">
            Lost
          </option>
        </select>

        <select
          className="border p-3 rounded-lg"
          value={filterSource}
          onChange={(e) =>
            setFilterSource(
              e.target.value
            )
          }
        >
          <option value="">
            All Sources
          </option>

          <option value="Website">
            Website
          </option>

          <option value="Instagram">
            Instagram
          </option>

          <option value="Referral">
            Referral
          </option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-3 border">
                Name
              </th>

              <th className="p-3 border">
                Email
              </th>

              <th className="p-3 border">
                Status
              </th>

              <th className="p-3 border">
                Source
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td className="p-3 border">
                  {lead.name}
                </td>

                <td className="p-3 border">
                  {lead.email}
                </td>

                <td className="p-3 border">
                  {lead.status}
                </td>

                <td className="p-3 border">
                  {lead.source}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-2xl font-bold mb-4">
              Add Lead
            </h2>

            <form
              onSubmit={
                handleCreateLead
              }
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Enter Name"
                className="w-full border p-3 rounded-lg"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                type="email"
                placeholder="Enter Email"
                className="w-full border p-3 rounded-lg"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

              <select
                className="w-full border p-3 rounded-lg"
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >
                <option>
                  New
                </option>

                <option>
                  Contacted
                </option>

                <option>
                  Qualified
                </option>

                <option>
                  Lost
                </option>
              </select>

              <select
                className="w-full border p-3 rounded-lg"
                value={source}
                onChange={(e) =>
                  setSource(
                    e.target.value
                  )
                }
              >
                <option>
                  Website
                </option>

                <option>
                  Instagram
                </option>

                <option>
                  Referral
                </option>
              </select>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg w-full"
                >
                  Create
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setShowModal(
                      false
                    )
                  }
                  className="bg-gray-300 px-4 py-2 rounded-lg w-full"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;