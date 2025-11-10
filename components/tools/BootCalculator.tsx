"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export default function BootCalculator() {
  const [formData, setFormData] = useState({
    relinquishedValue: '',
    replacementValue: '',
    cashReceived: '',
    oldMortgage: '',
    newMortgage: '',
  });

  const results = useMemo(() => {
    const rv = parseFloat(formData.relinquishedValue) || 0;
    const rp = parseFloat(formData.replacementValue) || 0;
    const cash = parseFloat(formData.cashReceived) || 0;
    const oldMortgage = parseFloat(formData.oldMortgage) || 0;
    const newMortgage = parseFloat(formData.newMortgage) || 0;

    // Calculate boot types
    const mortgageBoot = Math.max(0, oldMortgage - newMortgage);
    const cashBoot = cash;
    const propertyBoot = Math.max(0, rv - rp);

    // Total boot
    const totalBoot = mortgageBoot + cashBoot + propertyBoot;

    // Estimated tax (illustrative only - actual rates vary)
    const estimatedTax = totalBoot * 0.20; // 20% illustrative rate

    return {
      mortgageBoot,
      cashBoot,
      propertyBoot,
      totalBoot,
      estimatedTax,
      isValid: rv > 0 || rp > 0 || cash > 0 || oldMortgage > 0 || newMortgage > 0
    };
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    // Allow only numbers and decimal points
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, [field]: cleanValue }));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Calculator className="h-8 w-8 text-[#C9A227]" />
        <h2 className="font-serif text-2xl font-bold text-[#0B3C5D]">
          Boot Calculation Tool
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-4">
              Property Values
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="relinquished-value" className="block text-sm font-medium text-gray-700 mb-2">
                  Relinquished Property Value
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="relinquished-value"
                    type="text"
                    value={formData.relinquishedValue}
                    onChange={(e) => handleInputChange('relinquishedValue', e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fair market value of property being sold
                </p>
              </div>

              <div>
                <label htmlFor="replacement-value" className="block text-sm font-medium text-gray-700 mb-2">
                  Replacement Property Value
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="replacement-value"
                    type="text"
                    value={formData.replacementValue}
                    onChange={(e) => handleInputChange('replacementValue', e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fair market value of property being acquired
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-4">
              Cash & Financing
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="cash-received" className="block text-sm font-medium text-gray-700 mb-2">
                  Cash Received
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="cash-received"
                    type="text"
                    value={formData.cashReceived}
                    onChange={(e) => handleInputChange('cashReceived', e.target.value)}
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Any cash you receive from the exchange
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="old-mortgage" className="block text-sm font-medium text-gray-700 mb-2">
                    Old Mortgage Balance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="old-mortgage"
                      type="text"
                      value={formData.oldMortgage}
                      onChange={(e) => handleInputChange('oldMortgage', e.target.value)}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Mortgage on relinquished property
                  </p>
                </div>

                <div>
                  <label htmlFor="new-mortgage" className="block text-sm font-medium text-gray-700 mb-2">
                    New Mortgage Balance
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="new-mortgage"
                      type="text"
                      value={formData.newMortgage}
                      onChange={(e) => handleInputChange('newMortgage', e.target.value)}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Mortgage on replacement property
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-6">
            Calculation Results
          </h3>

          {results.isValid ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Boot Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-[#0B3C5D] flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Boot Breakdown
                </h4>

                <div className="space-y-3">
                  {results.cashBoot > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Cash Boot</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.cashBoot)}</span>
                    </div>
                  )}

                  {results.mortgageBoot > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Mortgage Boot</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.mortgageBoot)}</span>
                    </div>
                  )}

                  {results.propertyBoot > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">Property Boot</span>
                      <span className="font-semibold text-red-600">{formatCurrency(results.propertyBoot)}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-[#0B3C5D]">Total Boot</span>
                      <span className="font-bold text-red-600 text-lg">{formatCurrency(results.totalBoot)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Estimate */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5" />
                  Estimated Tax Impact
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-amber-700">Estimated Tax on Boot (20% illustrative rate)</span>
                    <span className="font-semibold text-amber-800">{formatCurrency(results.estimatedTax)}</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-3">
                    * This is an illustrative calculation only. Actual tax rates vary based on your situation,
                    depreciation, and current tax laws. Consult a tax advisor for accurate calculations.
                  </p>
                </div>
              </div>

              {/* Explanation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Understanding Boot</h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <p><strong>Cash Boot:</strong> Cash you receive that reduces your tax-deferred gain.</p>
                  <p><strong>Mortgage Boot:</strong> Occurs when your new mortgage is less than your old mortgage.</p>
                  <p><strong>Property Boot:</strong> When replacement property value is less than relinquished property value.</p>
                  <p className="mt-3"><em>Boot represents the portion of your exchange that is not tax-deferred and may be subject to capital gains tax.</em></p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Enter property values and financing details above to calculate boot and estimated tax impact.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          body { font-size: 12pt; }
          input { border: 1px solid #000 !important; }
        }
      `}</style>
    </div>
  );
}
