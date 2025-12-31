import React, { useState, useEffect } from "react";
import axios from "axios";
import { Save, Plus, Trash2 } from "lucide-react";

const emptyForm = {
  heading: "",
  subheading: "",
  mainTitle: "",
  description: "",
  yearsOfExcellence: "",
  benefits: [],
};

const AboutAdmin = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(true);

  /* ==========================
     FETCH ABOUT DATA
  ========================== */
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get("/api/about");

        setFormData({
          ...emptyForm,
          ...res.data,
          benefits: Array.isArray(res.data?.benefits)
            ? res.data.benefits
            : [],
        });
      } catch (err) {
        console.error("Failed to load about data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  /* ==========================
     HANDLERS
  ========================== */
  const handleBenefitChange = (index, field, value) => {
    const updated = [...formData.benefits];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, benefits: updated });
  };

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, { title: "", desc: "" }],
    });
  };

  const removeBenefit = (index) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/about", formData);
      alert("Updated Successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating About section");
    }
  };

  /* ==========================
     LOADING STATE
  ========================== */
  if (loading) {
    return (
      <div className="p-10 text-center font-semibold">
        Loading About Section...
      </div>
    );
  }

  return (
    <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-4xl mx-auto">
      <h2 className="text-2xl font-black mb-6">
        Edit <span className="text-primary">About Us</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* HEADINGS */}
        <div className="grid grid-cols-2 gap-4">
          <input
            className="border p-3 rounded-xl"
            placeholder="Subheading"
            value={formData.subheading}
            onChange={(e) =>
              setFormData({ ...formData, subheading: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-xl"
            placeholder="Main Heading"
            value={formData.heading}
            onChange={(e) =>
              setFormData({ ...formData, heading: e.target.value })
            }
          />
        </div>

        <input
          className="w-full border p-3 rounded-xl"
          placeholder="Creative Title"
          value={formData.mainTitle}
          onChange={(e) =>
            setFormData({ ...formData, mainTitle: e.target.value })
          }
        />

        <textarea
          className="w-full border p-3 rounded-xl"
          rows="4"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* BENEFITS */}
        <h3 className="font-bold mt-4">Benefits List</h3>

        {formData.benefits.length === 0 && (
          <p className="text-sm text-gray-400">No benefits added yet</p>
        )}

        {formData.benefits.map((b, i) => (
          <div key={i} className="flex gap-2 mb-2 items-center">
            <input
              className="border p-2 rounded-lg flex-1"
              placeholder="Title"
              value={b.title}
              onChange={(e) =>
                handleBenefitChange(i, "title", e.target.value)
              }
            />

            <input
              className="border p-2 rounded-lg flex-[2]"
              placeholder="Description"
              value={b.desc}
              onChange={(e) =>
                handleBenefitChange(i, "desc", e.target.value)
              }
            />

            <button
              type="button"
              onClick={() => removeBenefit(i)}
              className="text-red-500"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addBenefit}
          className="flex items-center gap-2 text-primary font-bold text-sm"
        >
          <Plus size={16} /> Add Benefit
        </button>

        <button
          type="submit"
          className="w-full bg-primary text-white p-4 rounded-2xl font-black flex justify-center gap-2 mt-6"
        >
          <Save size={20} /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default AboutAdmin;
