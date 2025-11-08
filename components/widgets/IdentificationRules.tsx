"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Target, Percent, Hash } from "lucide-react";

const RULES = [
  {
    id: "three-property",
    title: "Three Property Rule",
    icon: Hash,
    description: "Identify up to three replacement properties of any value",
    details: "You may identify up to three replacement properties without limitation on their combined value. This provides maximum flexibility for your exchange strategy."
  },
  {
    id: "200-percent",
    title: "200% Rule",
    icon: Percent,
    description: "Identify any number of properties totaling 200% of relinquished property value",
    details: "You may identify any number of replacement properties as long as their combined fair market value does not exceed 200% of your relinquished property's value."
  },
  {
    id: "95-percent",
    title: "95% Rule",
    icon: Target,
    description: "Identify any number of properties but must acquire 95% of total identified value",
    details: "You may identify any number of properties of any value, but you must acquire replacement properties worth at least 95% of the total identified value."
  }
];

export default function IdentificationRules() {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-6 w-6 text-amber-400" />
        <h3 className="font-serif text-lg text-white">
          1031 Identification Rules
        </h3>
      </div>

      <div className="space-y-4">
        <p className="text-slate-300 leading-relaxed">
          The IRS provides three methods for identifying replacement properties within the 45-day identification period.
          Choose the rule that best fits your exchange strategy.
        </p>

        {/* Rules Grid */}
        <div className="grid gap-4 md:grid-cols-1">
          {RULES.map((rule) => (
            <motion.div
              key={rule.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedRule === rule.id
                  ? "border-amber-500 bg-amber-500/10"
                  : "border-slate-800 bg-slate-800/60 hover:border-slate-700"
              }`}
              onClick={() => setSelectedRule(selectedRule === rule.id ? null : rule.id)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-start gap-3">
                <rule.icon className={`h-5 w-5 mt-1 flex-shrink-0 ${
                  selectedRule === rule.id ? "text-amber-400" : "text-slate-400"
                }`} />
                <div className="flex-1">
                  <h4 className={`font-medium mb-2 ${
                    selectedRule === rule.id ? "text-amber-200" : "text-white"
                  }`}>
                    {rule.title}
                  </h4>
                  <p className={`text-sm leading-relaxed ${
                    selectedRule === rule.id ? "text-slate-200" : "text-slate-300"
                  }`}>
                    {rule.description}
                  </p>

                  {selectedRule === rule.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-slate-700"
                    >
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {rule.details}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="bg-slate-800/60 rounded-lg p-4">
          <h4 className="font-medium text-white mb-3">Key Requirements for All Rules:</h4>
          <ul className="text-sm text-slate-300 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span>Identification must be in writing and delivered to your Qualified Intermediary</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span>Properties must be &quot;like-kind&quot; - real property held for productive use or investment</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span>Unintentionally destroying the identification (e.g., selling identified property) may disqualify the exchange</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span>You cannot change your identification method once the 45-day period expires</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400 mt-1">•</span>
              <span>Consult your Qualified Intermediary and tax advisor for your specific situation</span>
            </li>
          </ul>
        </div>

        {/* Educational Note */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
          <p className="text-sm text-amber-200">
            <strong>Note:</strong> These are general guidelines about IRS identification rules.
            Every 1031 exchange is unique and requires personalized advice from qualified professionals.
            We recommend consulting a Qualified Intermediary and tax advisor before proceeding.
          </p>
        </div>
      </div>
    </div>
  );
}
