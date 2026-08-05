import React from 'react';
import { Folder, Users, GraduationCap } from 'lucide-react';

export default function StatsBar() {
  const stats = [
    { icon: Folder, value: "250+", label: "Total Projects" },
    { icon: Users, value: "450+", label: "Students" },
    { icon: GraduationCap, value: "85+", label: "Tutors" }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-card">
                <Icon className="stat-icon" />
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
