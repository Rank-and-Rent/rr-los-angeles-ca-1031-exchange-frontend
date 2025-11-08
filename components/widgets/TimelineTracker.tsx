"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react";

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  daysFromClosing: number;
  status: 'completed' | 'current' | 'upcoming' | 'overdue';
  required: boolean;
}

const BASE_STEPS: Omit<TimelineStep, 'status'>[] = [
  {
    id: 'closing',
    title: 'Relinquished Property Closing',
    description: 'Transfer of relinquished property to buyer',
    daysFromClosing: 0,
    required: true
  },
  {
    id: 'qi_assignment',
    title: 'QI Assignment & Documentation',
    description: 'Execute Qualified Intermediary agreement and assignment documents',
    daysFromClosing: 1,
    required: true
  },
  {
    id: 'identification_period',
    title: '45-Day Identification Period',
    description: 'Identify replacement properties in writing',
    daysFromClosing: 45,
    required: true
  },
  {
    id: 'identification_deadline',
    title: 'Identification Deadline',
    description: 'Final day to submit written identification to QI',
    daysFromClosing: 45,
    required: true
  },
  {
    id: 'replacement_search',
    title: 'Replacement Property Search',
    description: 'Continue evaluating and negotiating replacement properties',
    daysFromClosing: 90,
    required: false
  },
  {
    id: 'due_diligence',
    title: 'Due Diligence & Inspections',
    description: 'Complete property inspections, appraisals, and financing',
    daysFromClosing: 135,
    required: false
  },
  {
    id: 'exchange_deadline',
    title: 'Exchange Completion Deadline',
    description: 'Close on replacement property (180 days or tax return due date)',
    daysFromClosing: 180,
    required: true
  },
  {
    id: 'reporting',
    title: 'IRS Reporting (Form 8824)',
    description: 'File Form 8824 with tax return (due April 15 following year)',
    daysFromClosing: 365,
    required: true
  }
];

export default function TimelineTracker() {
  const [closingDate, setClosingDate] = useState("");

  const timelineSteps = BASE_STEPS.map(step => {
    if (!closingDate) {
      return { ...step, status: 'upcoming' as const };
    }

    const closing = new Date(closingDate);
    const stepDate = new Date(closing);
    stepDate.setDate(closing.getDate() + step.daysFromClosing);

    const today = new Date();
    const daysUntilStep = Math.ceil((stepDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let status: TimelineStep['status'];
    if (daysUntilStep < -7) {
      status = 'completed';
    } else if (daysUntilStep < 0) {
      status = 'overdue';
    } else if (daysUntilStep <= 7) {
      status = 'current';
    } else {
      status = 'upcoming';
    }

    return { ...step, status };
  });

  const getStatusIcon = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'current':
        return <Clock className="h-5 w-5 text-amber-400" />;
      case 'overdue':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      default:
        return <Calendar className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500/30 bg-green-500/10';
      case 'current':
        return 'border-amber-500/50 bg-amber-500/10';
      case 'overdue':
        return 'border-red-500/30 bg-red-500/10';
      default:
        return 'border-slate-700 bg-slate-800/60';
    }
  };

  const getStatusTextColor = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-300';
      case 'current':
        return 'text-amber-300';
      case 'overdue':
        return 'text-red-300';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="h-6 w-6 text-amber-400" />
        <h3 className="font-serif text-lg text-white">
          1031 Exchange Timeline Tracker
        </h3>
      </div>

      <div className="space-y-6">
        {/* Date Input */}
        <div>
          <label htmlFor="timeline-closing-date" className="block text-sm font-medium text-slate-200 mb-2">
            Relinquished Property Closing Date
          </label>
          <input
            id="timeline-closing-date"
            type="date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
          />
          <p className="text-xs text-slate-400 mt-1">
            Enter your closing date to see personalized timeline
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {timelineSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative border rounded-lg p-4 ${getStatusColor(step.status)}`}
            >
              {/* Connector Line */}
              {index < timelineSteps.length - 1 && (
                <div className="absolute left-8 top-16 w-0.5 h-8 bg-slate-600" />
              )}

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(step.status)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className={`font-medium ${step.status === 'completed' || step.status === 'current' ? 'text-white' : 'text-slate-200'}`}>
                      {step.title}
                    </h4>
                    {step.required && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">
                        Required
                      </span>
                    )}
                  </div>

                  <p className={`text-sm leading-relaxed mb-3 ${getStatusTextColor(step.status)}`}>
                    {step.description}
                  </p>

                  {closingDate && (
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {step.daysFromClosing === 0
                          ? 'Closing Day'
                          : `${step.daysFromClosing} days after closing`
                        }
                        {step.id === 'reporting' && ' (Following tax year)'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-slate-800/60 rounded-lg p-4">
          <h4 className="font-medium text-white mb-3">Timeline Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <span className="text-slate-300">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span className="text-slate-300">Current (7 days)</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-slate-300">Overdue</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-400" />
              <span className="text-slate-300">Upcoming</span>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <p className="text-sm text-amber-200">
            <strong>Important:</strong> This timeline is for educational purposes only and represents typical 1031 exchange milestones.
            Your specific timeline may vary based on property type, financing, and market conditions.
            Always consult with your Qualified Intermediary and legal advisors for personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
