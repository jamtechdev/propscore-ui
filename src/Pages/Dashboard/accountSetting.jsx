import React, { useEffect, useState } from "react";
import DashboardTitle from "../../Component/DashboardTitle";
import DashboardSidebar from "../../Component/DashboardSidebar";
import api from "../../api";
import { toast } from "react-toastify";

export default function AccountSetting() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    profile_picture: "/imgs/user_dp.png",
    role: "",
    license_number: "",
    mls_regions: "",
    agency_name: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/get-Profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.status) {
          setProfile({
            ...profile,
            ...response.data.data,
            profile_picture:
              response.data.data.profile_picture || "/imgs/user_dp.png",
          });
        } else {
          toast.error("Failed to load profile");
        }
      } catch (error) {
        setError("Error loading profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/profile/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status) {
        // Update profile picture URL on success
        setProfile((prev) => ({
          ...prev,
          profile_picture:
            response.data.data.profile_picture || prev.profile_picture,
        }));
        toast.success("Profile picture updated successfully");
      } else {
        toast.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      toast.error("Failed to upload profile picture");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    const handleSave = async () => {
      setSaving(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const response = await api.post(
          "/update-Profile",
          { ...profile},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status) {
          toast.success("Changes saved successfully");
          setProfile((prev) => ({
            ...prev,
            ...response.data.data,
            profile_picture:
              response.data.data.profile_picture || prev.profile_picture,
          }));
        } else {
          setError("Failed to update profile.");
        }
      } catch (error) {
        setError(
          error.response?.data?.errors ||
            error.message ||
            "An error occurred while updating."
        );
      } finally {
        setSaving(false);
      }
    };

    if (loading) {
      return <div>Loading profile...</div>;
    }

  return (
    <>
      <DashboardTitle
        title="Account Settings"
        subtitle="Changes to account settings will apply to all of your workspaces. You can make changes as needed."
      />
      <div className="dashboard-inner-layout">
        <DashboardSidebar />
        <div className="dashboard-inner-content">
          <div className="inner-title">
            <h2>My Profile</h2>
          </div>
          <div className="d-flex flex-column gap-3">
            <div className="dashboard-card">
              <div className="form-wrapper-row">
                <div className="form-wrapper-col">
                  <div className="form-heading">
                    <h3>General Information</h3>
                    <p>
                      Manage and update your personal
                      <br />
                      details to keep your account accurate.
                    </p>
                  </div>
                </div>
                <div className="form-wrapper-col">
                  <div
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                    className="d-grid gap-4"
                  >
                    <div style={{ gridColumn: "span 2" }}>
                      <div className="avatar-profile">
                        <img src={profile.profile_picture}/>
                        <div className="file-select">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.70318 12.25H8.29552C10.1161 12.25 11.0267 12.25 11.6806 11.8213C11.9628 11.6364 12.2059 11.3978 12.3958 11.1189C12.8327 10.4773 12.8327 9.58303 12.8327 7.79569C12.8327 6.00836 12.8327 5.11411 12.3958 4.47244C12.2059 4.19361 11.9628 3.95494 11.6806 3.77011C11.2606 3.49419 10.7344 3.39561 9.92885 3.36061C9.54443 3.36061 9.21368 3.07478 9.13843 2.70436C9.08092 2.43303 8.93151 2.18988 8.71543 2.016C8.49935 1.84212 8.22986 1.74817 7.95252 1.75003H6.04618C5.46985 1.75003 4.97343 2.14961 4.86027 2.70436C4.78502 3.07478 4.45427 3.36061 4.06985 3.36061C3.26485 3.39561 2.73868 3.49478 2.3181 3.77011C2.03608 3.955 1.79326 4.19366 1.60352 4.47244C1.16602 5.11411 1.16602 6.00778 1.16602 7.79569C1.16602 9.58361 1.16602 10.4767 1.60293 11.1189C1.79193 11.3966 2.0346 11.6352 2.3181 11.8213C2.97202 12.25 3.8826 12.25 5.70318 12.25ZM6.99935 5.40928C5.6571 5.40928 4.5686 6.47736 4.5686 7.79511C4.5686 9.11286 5.65768 10.1827 6.99935 10.1827C8.34102 10.1827 9.4301 9.11403 9.4301 7.79628C9.4301 6.47853 8.34102 5.40928 6.99935 5.40928ZM6.99935 6.36361C6.19435 6.36361 5.54102 7.00469 5.54102 7.79569C5.54102 8.58611 6.19435 9.22719 6.99935 9.22719C7.80435 9.22719 8.45768 8.58611 8.45768 7.79569C8.45768 7.00528 7.80435 6.36361 6.99935 6.36361ZM9.75385 5.88644C9.75385 5.62278 9.97143 5.40928 10.2403 5.40928H10.8878C11.1562 5.40928 11.3743 5.62278 11.3743 5.88644C11.3731 6.01413 11.3212 6.13611 11.2301 6.22558C11.139 6.31505 11.0161 6.3647 10.8884 6.36361H10.2403C10.1771 6.36423 10.1143 6.35237 10.0556 6.32872C9.99691 6.30508 9.94344 6.2701 9.89827 6.22579C9.85309 6.18148 9.81709 6.12871 9.7923 6.07048C9.76753 6.01226 9.75446 5.94972 9.75385 5.88644Z"
                              fill="#FDFDFD"
                            />
                          </svg>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/jpg,image/gif"
                            onChange={handleUpload}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          name="first_name"
                          value={profile.first_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name"
                          name="last_name"
                          value={profile.last_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">Email</label>
                        <div className="icon-box">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13.332 2.66797H2.66536C1.93203 2.66797 1.3387 3.26797 1.3387 4.0013L1.33203 12.0013C1.33203 12.7346 1.93203 13.3346 2.66536 13.3346H13.332C14.0654 13.3346 14.6654 12.7346 14.6654 12.0013V4.0013C14.6654 3.26797 14.0654 2.66797 13.332 2.66797ZM13.0654 5.5013L8.35203 8.44797C8.1387 8.5813 7.8587 8.5813 7.64536 8.44797L2.93203 5.5013C2.86518 5.46378 2.80664 5.41308 2.75996 5.35227C2.71327 5.29147 2.67941 5.22182 2.66041 5.14755C2.64142 5.07328 2.6377 4.99593 2.64947 4.92017C2.66124 4.84442 2.68826 4.77184 2.72889 4.70684C2.76952 4.64183 2.82291 4.58574 2.88585 4.54197C2.94878 4.49819 3.01995 4.46764 3.09503 4.45217C3.17011 4.43669 3.24755 4.43661 3.32267 4.45193C3.39778 4.46725 3.46901 4.49766 3.53203 4.5413L7.9987 7.33464L12.4654 4.5413C12.5284 4.49766 12.5996 4.46725 12.6747 4.45193C12.7498 4.43661 12.8273 4.43669 12.9024 4.45217C12.9775 4.46764 13.0486 4.49819 13.1115 4.54197C13.1745 4.58574 13.2279 4.64183 13.2685 4.70684C13.3091 4.77184 13.3362 4.84442 13.3479 4.92017C13.3597 4.99593 13.356 5.07328 13.337 5.14755C13.318 5.22182 13.2841 5.29147 13.2374 5.35227C13.1908 5.41308 13.1322 5.46378 13.0654 5.5013Z"
                              fill="#97999D"
                            />
                          </svg>{" "}
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">
                          Phone number <span>(Optional)</span>
                        </label>
                        <div className="icon-box">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M11.0373 8.60464L10.7339 8.90664C10.7339 8.90664 10.0119 9.62397 8.04192 7.6653C6.07192 5.70664 6.79392 4.9893 6.79392 4.9893L6.98459 4.79864C7.45592 4.33064 7.50059 3.57864 7.08925 3.0293L6.24925 1.9073C5.73992 1.2273 4.75659 1.1373 4.17325 1.7173L3.12659 2.7573C2.83792 3.0453 2.64459 3.4173 2.66792 3.83064C2.72792 4.88864 3.20659 7.16397 5.87592 9.81864C8.70725 12.6333 11.3639 12.7453 12.4499 12.644C12.7939 12.612 13.0926 12.4373 13.3333 12.1973L14.2799 11.256C14.9199 10.6206 14.7399 9.53064 13.9213 9.08597L12.6479 8.3933C12.1106 8.10197 11.4573 8.1873 11.0373 8.60464Z"
                              fill="#97999D"
                            />
                          </svg>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Phone Number"
                            name="phone_number"
                            value={profile.phone_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-card">
              <div className="form-wrapper-row">
                <div className="form-wrapper-col">
                  <div className="form-heading">
                    <h3>Professional Information</h3>
                    <p>
                      Provide your licensing and agency details <br /> to verify
                      your professional status.
                    </p>
                  </div>
                </div>
                <div className="form-wrapper-col">
                  <div
                    style={{ gridTemplateColumns: "1fr 1fr" }}
                    className="d-grid gap-4"
                  >
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">Account Type</label>
                        <select
                          name="role"
                          className="form-select"
                          value={profile.role}
                          onChange={handleChange}
                        >
                          <option value="agent">Agent</option>
                          <option value="client">Client</option>
                          <option value="private_buyer">Private Buyer</option>
                          <option value="investor">Investor</option>
                          <option value="broker">Broker</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">License number</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="License Number"
                          name="license_number"
                          value={profile.license_number}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">MLS Regions/Areas</label>
                        <div className="icon-box">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M12.874 12.6C13.1673 12.14 13.334 11.5867 13.334 11C13.334 9.33333 12.0007 8 10.334 8C8.66732 8 7.33398 9.33333 7.33398 11C7.33398 12.6667 8.66732 14 10.334 14C10.914 14 11.4607 13.8333 11.9207 13.5467L14.0007 15.5933L14.9273 14.6667L12.874 12.6ZM10.334 12.6667C9.89196 12.6667 9.46803 12.4911 9.15547 12.1785C8.84291 11.866 8.66732 11.442 8.66732 11C8.66732 10.558 8.84291 10.134 9.15547 9.82149C9.46803 9.50893 9.89196 9.33333 10.334 9.33333C10.776 9.33333 11.1999 9.50893 11.5125 9.82149C11.8251 10.134 12.0007 10.558 12.0007 11C12.0007 11.442 11.8251 11.866 11.5125 12.1785C11.1999 12.4911 10.776 12.6667 10.334 12.6667ZM3.33398 13.3333V8H1.33398L8.00065 2L14.6673 8H13.454C12.6673 7.18 11.5607 6.66667 10.334 6.66667C7.94732 6.66667 6.00065 8.61333 6.00065 11C6.00065 11.86 6.25398 12.6667 6.68732 13.3333H3.33398Z"
                              fill="#97999D"
                            />
                          </svg>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MLS Regions"
                            name="mls_regions"
                            value={profile.mls_regions}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="dashboard-form">
                        <label className="form-label">
                          Agency name <span>(Optional)</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Agency Name"
                          name="agency_name"
                          value={profile.agency_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4 d-flex align-items-center justify-content-end">
            <button
              className="dashboard-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
