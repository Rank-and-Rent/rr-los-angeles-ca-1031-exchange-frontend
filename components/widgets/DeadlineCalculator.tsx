"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, AlertTriangle, CheckCircle } from "lucide-react";

export default function DeadlineCalculator() {
  const [closingDate, setClosingDate] = useState("");

  const deadlines = useMemo(() => {
    if (!closingDate) return null;

    const closing = new Date(closingDate);
    const identificationDeadline = new Date(closing);
    identificationDeadline.setDate(closing.getDate() + 45);

    const exchangeDeadline = new Date(closing);
    exchangeDeadline.setDate(closing.getDate() + 180);

    // Check if tax return due date affects 180-day deadline
    const taxYear = closing.getFullYear();
    const taxReturnDue = new Date(taxYear + 1, 2, 15); // April 15 of next year
    if (taxReturnDue.getDay() === 0) taxReturnDue.setDate(taxReturnDue.getDate() + 1); // If Sunday, move to Monday
    if (taxReturnDue.getDay() === 6) taxReturnDue.setDate(taxReturnDue.getDate() - 1); // If Saturday, move to Friday

    const finalDeadline = exchangeDeadline < taxReturnDue ? exchangeDeadline : taxReturnDue;

    const today = new Date();
    const daysToIdentification = Math.ceil((identificationDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const daysToExchange = Math.ceil((finalDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return {
      closing: closing.toLocaleDateString(),
      identification: identificationDeadline.toLocaleDateString(),
      exchange: finalDeadline.toLocaleDateString(),
      daysToIdentification,
      daysToExchange,
      isIdentificationOverdue: daysToIdentification < 0,
      isExchangeOverdue: daysToExchange < 0,
      isTaxReturnLimited: exchangeDeadline > taxReturnDue
    };
  }, [closingDate]);

  const getStatusColor = (days: number, overdue: boolean) => {
    if (overdue) return "text-red-400";
    if (days <= 7) return "text-orange-400";
    if (days <= 30) return "text-yellow-400";
    return "text-green-400";
  };

  const getStatusIcon = (days: number, overdue: boolean) => {
    if (overdue) return <AlertTriangle className="h-5 w-5 text-red-400" />;
    if (days <= 7) return <AlertTriangle className="h-5 w-5 text-orange-400" />;
    if (days <= 30) return <Clock className="h-5 w-5 text-yellow-400" />;
    return <CheckCircle className="h-5 w-5 text-green-400" />;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-6 w-6 text-amber-400" />
        <h3 className="font-serif text-lg text-white">
          1031 Exchange Deadline Calculator
        </h3>
      </div>

      <div className="space-y-6">
        {/* Date Input */}
        <div>
          <label htmlFor="closing-date" className="block text-sm font-medium text-slate-200 mb-2">
            Relinquished Property Closing Date
          </label>
          <input
            id="closing-date"
            type="date"
            value={closingDate}
            onChange={(e) => setClosingDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-colors"
          />
          <p className="text-xs text-slate-400 mt-1">
            Enter the date your relinquished property closes
          </p>
        </div>

        {/* Results */}
        {deadlines && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              {/* 45-Day Identification Deadline */}
              <div className="bg-slate-800/60 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">
                    45-Day Identification
                  </span>
                  {getStatusIcon(deadlines.daysToIdentification, deadlines.isIdentificationOverdue)}
                </div>
                <p className="text-lg font-semibold text-white mb-1">
                  {deadlines.identification}
                </p>
                <p className={`text-sm ${getStatusColor(deadlines.daysToIdentification, deadlines.isIdentificationOverdue)}`}>
                  {deadlines.isIdentificationOverdue
                    ? `${Math.abs(deadlines.daysToIdentification)} days overdue`
                    : `${deadlines.daysToIdentification} days remaining`
                  }
                </p>
              </div>

              {/* 180-Day Exchange Deadline */}
              <div className="bg-slate-800/60 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-200">
                    Exchange Deadline
                  </span>
                  {getStatusIcon(deadlines.daysToExchange, deadlines.isExchangeOverdue)}
                </div>
                <p className="text-lg font-semibold text-white mb-1">
                  {deadlines.exchange}
                </p>
                <p className={`text-sm ${getStatusColor(deadlines.daysToExchange, deadlines.isExchangeOverdue)}`}>
                  {deadlines.isExchangeOverdue
                    ? `${Math.abs(deadlines.daysToExchange)} days overdue`
                    : `${deadlines.daysToExchange} days remaining`
                  }
                </p>
                {deadlines.isTaxReturnLimited && (
                  <p className="text-xs text-amber-400 mt-1">
                    Limited by tax return due date
                  </p>
                )}
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <h4 className="font-medium text-amber-200 mb-2">Important Notes:</h4>
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Deadlines are calculated in calendar days, not business days</li>
                <li>• The 180-day deadline may be limited by your tax return due date</li>
                <li>• Consult a Qualified Intermediary for your specific situation</li>
                <li>• Missing deadlines will disqualify your 1031 exchange</li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* Educational Content */}
        {!deadlines && (
          <div className="bg-slate-800/60 rounded-lg p-4">
            <h4 className="font-medium text-white mb-3">Understanding 1031 Exchange Deadlines</h4>
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-amber-400">45-Day Identification Period:</strong> You must identify potential replacement properties in writing within 45 calendar days of your relinquished property closing.
              </p>
              <p>
                <strong className="text-amber-400">180-Day Exchange Period:</strong> You must acquire and close on your replacement property within 180 calendar days, or by the due date of your tax return (including extensions), whichever occurs first.
              </p>
              <p>
                These deadlines are strict IRS requirements. Working with a Qualified Intermediary early in the process helps ensure compliance.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
