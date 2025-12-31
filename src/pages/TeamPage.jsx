// src/pages/TeamPage.jsx
import { useEffect, useState } from "react";
import { Linkedin, Twitter, Mail, ArrowRight, Star } from "lucide-react";
import axios from "axios";

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  /* ================= FETCH TEAM FROM BACKEND ================= */
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/team`
        );
        setTeamMembers(res.data || []);
      } catch (error) {
        console.error("Failed to fetch team members", error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative bg-dark text-white overflow-hidden py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6 border border-primary/30">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-black uppercase tracking-widest">
              The Experts Behind CashPro
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-7xl font-black mb-6 leading-tight">
            Meet the Minds <br />
            <span className="text-primary italic">Fueling Your Growth.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base lg:text-xl max-w-3xl mx-auto leading-relaxed">
            We are a group of financial strategists, banking veterans, and
            technology enthusiasts dedicated to making loans simple, fast, and
            transparent.
          </p>
        </div>
      </section>

      {/* ================= TEAM GRID ================= */}
      <section className="py-14 sm:py-16 lg:py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {teamMembers.map((member) => (
            <div key={member._id} className="group relative">

              {/* IMAGE */}
              <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden aspect-[4/5] shadow-xl transition-all duration-500 group-hover:-translate-y-3">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* SOCIAL OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                  <div className="flex gap-3 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center hover:bg-white hover:text-primary transition-all"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}

                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-primary transition-all"
                      >
                        <Twitter size={18} />
                      </a>
                    )}

                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="w-11 h-11 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center hover:bg-primary transition-all"
                      >
                        <Mail size={18} />
                      </a>
                    )}

                  </div>
                </div>
              </div>

              {/* INFO */}
              <div className="mt-6 text-center sm:text-left px-2">
                <h4 className="text-lg sm:text-xl font-black text-dark group-hover:text-primary transition-colors">
                  {member.name}
                </h4>
                <p className="text-primary font-bold text-xs uppercase tracking-widest mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

            </div>
          ))}

        </div>
      </section>

      {/* ================= JOIN US ================= */}
      <section className="w-full pb-16 sm:pb-20 lg:pb-32">
        <div className="w-full mx-auto bg-gray-50 rounded-[32px] sm:rounded-[48px] p-8 sm:p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-12 border border-gray-100">

          {/* LEFT */}
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-primary/10 rounded-full blur-3xl"></div>

            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-dark mb-5 leading-tight">
              Believe in our <br />
              mission?{" "}
              <span className="text-primary text-xl sm:text-2xl">
                Work with us.
              </span>
            </h2>

            <p className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 max-w-md">
              We're always looking for ambitious people who want to change how
              the world thinks about loans.
            </p>

            <button className="flex items-center gap-3 bg-dark text-white px-8 py-4 rounded-2xl font-black hover:bg-primary transition-all group">
              View Openings
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          {/* RIGHT VISUAL */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="h-40 sm:h-48 bg-primary rounded-3xl overflow-hidden shadow-xl animate-float">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400"
                  className="w-full h-full object-cover opacity-50"
                  alt=""
                />
              </div>
              <div className="h-28 sm:h-32 bg-dark rounded-3xl shadow-xl"></div>
            </div>

            <div className="space-y-4 pt-6 sm:pt-8">
              <div className="h-28 sm:h-32 bg-gray-200 rounded-3xl shadow-xl"></div>
              <div className="h-40 sm:h-48 bg-white rounded-3xl shadow-xl border border-gray-200 p-6 flex flex-col justify-center">
                <p className="text-dark font-black text-2xl sm:text-3xl">50+</p>
                <p className="text-gray-500 text-xs font-bold uppercase">
                  Financial Experts
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FLOAT ANIMATION */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default TeamPage;
