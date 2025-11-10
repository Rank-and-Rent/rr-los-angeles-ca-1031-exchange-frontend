"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Receipt, DollarSign, Calculator, Building } from "lucide-react";

export default function ExchangeCostEstimator() {
  const [formData, setFormData] = useState({
    propertyValue: '',
    qiFeePercentage: '1.5',
    escrowFee: '1500',
    titleRate: '0.65',
    recordingFees: '75',
  });

  const results = useMemo(() => {
    const propertyValue = parseFloat(formData.propertyValue) || 0;
    const qiFeePercentage = parseFloat(formData.qiFeePercentage) || 0;
    const escrowFee = parseFloat(formData.escrowFee) || 0;
    const titleRate = parseFloat(formData.titleRate) || 0;
    const recordingFees = parseFloat(formData.recordingFees) || 0;

    // Calculate individual costs
    const qiFee = propertyValue * (qiFeePercentage / 100);
    const titleInsurance = propertyValue * (titleRate / 100);
    const totalCosts = qiFee + escrowFee + titleInsurance + recordingFees;

    // Breakdown for display
    const breakdown = [
      { name: 'Qualified Intermediary Fee', amount: qiFee, percentage: qiFeePercentage },
      { name: 'Escrow Fee', amount: escrowFee, percentage: null },
      { name: 'Title Insurance', amount: titleInsurance, percentage: titleRate },
      { name: 'Recording Fees', amount: recordingFees, percentage: null },
    ];

    return {
      breakdown,
      totalCosts,
      isValid: propertyValue > 0
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center gap-3 mb-8">
        <Receipt className="h-8 w-8 text-[#C9A227]" />
        <h2 className="font-serif text-2xl font-bold text-[#0B3C5D]">
          Exchange Cost Estimator
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-4">
              Property Information
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="property-value" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Value
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="property-value"
                    type="text"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                    placeholder="500000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fair market value of the replacement property
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-4">
              Cost Parameters
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="qi-fee" className="block text-sm font-medium text-gray-700 mb-2">
                  QI Fee Percentage
                </label>
                <div className="relative">
                  <input
                    id="qi-fee"
                    type="text"
                    value={formData.qiFeePercentage}
                    onChange={(e) => handleInputChange('qiFeePercentage', e.target.value)}
                    placeholder="1.5"
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Typical range: 1.0% - 2.5% of property value
                </p>
              </div>

              <div>
                <label htmlFor="escrow-fee" className="block text-sm font-medium text-gray-700 mb-2">
                  Escrow Fee
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="escrow-fee"
                    type="text"
                    value={formData.escrowFee}
                    onChange={(e) => handleInputChange('escrowFee', e.target.value)}
                    placeholder="1500"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Los Angeles County escrow company fee
                </p>
              </div>

              <div>
                <label htmlFor="title-rate" className="block text-sm font-medium text-gray-700 mb-2">
                  Title Insurance Rate
                </label>
                <div className="relative">
                  <input
                    id="title-rate"
                    type="text"
                    value={formData.titleRate}
                    onChange={(e) => handleInputChange('titleRate', e.target.value)}
                    placeholder="0.65"
                    className="w-full pr-8 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Owner&apos;s policy rate (typically 0.5% - 0.8%)
                </p>
              </div>

              <div>
                <label htmlFor="recording-fees" className="block text-sm font-medium text-gray-700 mb-2">
                  Recording Fees
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="recording-fees"
                    type="text"
                    value={formData.recordingFees}
                    onChange={(e) => handleInputChange('recordingFees', e.target.value)}
                    placeholder="75"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Los Angeles County recording fee per document
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-6">
            Cost Breakdown
          </h3>

          {results.isValid ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Cost Breakdown */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h4 className="font-semibold text-[#0B3C5D] flex items-center gap-2 mb-4">
                  <Calculator className="h-5 w-5" />
                  Estimated Exchange Costs
                </h4>

                <div className="space-y-3">
                  {results.breakdown.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <div>
                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        {item.percentage && (
                          <span className="text-xs text-gray-500 ml-2">
                            ({formatPercentage(item.percentage)})
                          </span>
                        )}
                      </div>
                      <span className="font-semibold text-[#0B3C5D]">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}

                  <div className="border-t border-gray-300 pt-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#0B3C5D] text-lg">Total Estimated Costs</span>
                      <span className="font-bold text-[#C9A227] text-xl">{formatCurrency(results.totalCosts)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost as Percentage */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Cost Analysis
                </h4>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex justify-between">
                    <span>Total costs as % of property value:</span>
                    <span className="font-semibold">
                      {((results.totalCosts / (parseFloat(formData.propertyValue) || 1)) * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cost per $100,000 of property value:</span>
                    <span className="font-semibold">
                      {formatCurrency(results.totalCosts / ((parseFloat(formData.propertyValue) || 1) / 100000))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h4 className="font-semibold text-amber-800 mb-3">Important Notes</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Additional costs may include appraisals, inspections, and legal fees</li>
                  <li>• QI fees vary by firm and exchange complexity</li>
                  <li>• Title insurance rates depend on property type and location</li>
                  <li>• Recording fees are set by Los Angeles County</li>
                  <li>• These are estimates only - actual costs may vary</li>
                </ul>
              </div>

              {/* California Note */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-700">
                  <strong>California Note:</strong> Los Angeles County does not impose a documentary transfer tax on 1031 exchanges.
                  However, recording fees and title insurance premiums still apply.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Receipt className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Enter property value above to estimate exchange costs for Los Angeles County.
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
