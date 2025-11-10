"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Target, Hash, Percent } from "lucide-react";

const RULES = [
  {
    id: 'three-property',
    title: 'Three Property Rule',
    icon: Hash,
    description: 'Identify up to 3 replacement properties of any value',
    longDescription: 'You may identify up to three replacement properties without limitation on their combined value. This provides maximum flexibility for your exchange strategy.',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validator: (identifiedCount: number, _totalValue: number, _relinquishedValue: number) => ({
      passes: identifiedCount <= 3,
      message: identifiedCount <= 3
        ? '✓ Compliant with Three Property Rule'
        : `✗ Too many properties identified (${identifiedCount}). Maximum is 3.`
    })
  },
  {
    id: '200-percent',
    title: '200% Rule',
    icon: Percent,
    description: 'Identify any number of properties totaling ≤200% of relinquished value',
    longDescription: 'You may identify any number of replacement properties as long as their combined fair market value does not exceed 200% of your relinquished property\'s value.',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validator: (_identifiedCount: number, totalValue: number, relinquishedValue: number) => ({
      passes: totalValue <= (relinquishedValue * 2),
      message: totalValue <= (relinquishedValue * 2)
        ? '✓ Compliant with 200% Rule'
        : `✗ Identified value (${totalValue.toLocaleString()}) exceeds 200% of relinquished value (${(relinquishedValue * 2).toLocaleString()})`
    })
  },
  {
    id: '95-percent',
    title: '95% Rule',
    icon: Target,
    description: 'Identify any number but acquire ≥95% of total identified value',
    longDescription: 'You may identify any number of properties of any value, but you must acquire replacement properties worth at least 95% of the total identified value.',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validator: (_identifiedCount: number, _totalValue: number, _relinquishedValue: number) => ({
      passes: true, // This rule is about acquisition, not identification
      message: '✓ 95% Rule applies to acquisition phase (not identification)'
    })
  }
];

export default function IdentificationRulesChecker() {
  const [formData, setFormData] = useState({
    relinquishedValue: '',
    identifiedProperties: [{ id: 1, value: '' }],
  });

  const results = useMemo(() => {
    const relinquishedValue = parseFloat(formData.relinquishedValue) || 0;
    const validProperties = formData.identifiedProperties.filter(p => parseFloat(p.value) > 0);
    const identifiedCount = validProperties.length;
    const totalIdentifiedValue = validProperties.reduce((sum, p) => sum + (parseFloat(p.value) || 0), 0);

    if (relinquishedValue === 0 || identifiedCount === 0) {
      return null;
    }

    const ruleResults = RULES.map(rule => ({
      ...rule,
      result: rule.validator(identifiedCount, totalIdentifiedValue, relinquishedValue)
    }));

    const allRulesPass = ruleResults.every(r => r.result.passes);

    return {
      relinquishedValue,
      identifiedCount,
      totalIdentifiedValue,
      ruleResults,
      allRulesPass,
      summary: {
        message: allRulesPass
          ? 'Your identification appears compliant with IRS rules'
          : 'Your identification may not comply with IRS rules',
        status: allRulesPass ? 'success' : 'warning'
      }
    };
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, [field]: cleanValue }));
  };

  const handlePropertyValueChange = (id: number, value: string) => {
    const cleanValue = value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({
      ...prev,
      identifiedProperties: prev.identifiedProperties.map(prop =>
        prop.id === id ? { ...prop, value: cleanValue } : prop
      )
    }));
  };

  const addProperty = () => {
    const newId = Math.max(...formData.identifiedProperties.map(p => p.id)) + 1;
    setFormData(prev => ({
      ...prev,
      identifiedProperties: [...prev.identifiedProperties, { id: newId, value: '' }]
    }));
  };

  const removeProperty = (id: number) => {
    if (formData.identifiedProperties.length > 1) {
      setFormData(prev => ({
        ...prev,
        identifiedProperties: prev.identifiedProperties.filter(p => p.id !== id)
      }));
    }
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
        <Target className="h-8 w-8 text-[#C9A227]" />
        <h2 className="font-serif text-2xl font-bold text-[#0B3C5D]">
          Identification Rules Validator
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Input Form */}
        <div className="space-y-6">
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-4">
              Exchange Details
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="relinquished-value" className="block text-sm font-medium text-gray-700 mb-2">
                  Relinquished Property Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    id="relinquished-value"
                    type="text"
                    value={formData.relinquishedValue}
                    onChange={(e) => handleInputChange('relinquishedValue', e.target.value)}
                    placeholder="500000"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fair market value of property being sold
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-4">
              Identified Replacement Properties
            </h3>
            <div className="space-y-3">
              {formData.identifiedProperties.map((property, index) => (
                <div key={property.id} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property {index + 1} Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="text"
                        value={property.value}
                        onChange={(e) => handlePropertyValueChange(property.id, e.target.value)}
                        placeholder="250000"
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9A227]/50 focus:border-[#C9A227] transition-colors"
                      />
                    </div>
                  </div>
                  {formData.identifiedProperties.length > 1 && (
                    <button
                      onClick={() => removeProperty(property.id)}
                      className="px-3 py-3 text-red-600 hover:text-red-800 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove property"
                    >
                      <XCircle className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}

              <button
                onClick={addProperty}
                className="w-full py-2 px-4 border border-[#C9A227] text-[#C9A227] rounded-lg hover:bg-[#C9A227] hover:text-white transition-colors font-medium"
              >
                + Add Another Property
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <h3 className="font-serif text-xl font-semibold text-[#0B3C5D] mb-6">
            Rule Validation Results
          </h3>

          {results ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Summary */}
              <div className={`rounded-lg p-6 ${
                results.summary.status === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-amber-50 border border-amber-200'
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  {results.summary.status === 'success' ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  )}
                  <h4 className={`font-semibold ${
                    results.summary.status === 'success' ? 'text-green-800' : 'text-amber-800'
                  }`}>
                    Validation Summary
                  </h4>
                </div>
                <p className={`text-sm ${
                  results.summary.status === 'success' ? 'text-green-700' : 'text-amber-700'
                }`}>
                  {results.summary.message}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Properties identified:</span>
                    <span className="ml-2 font-semibold">{results.identifiedCount}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Total identified value:</span>
                    <span className="ml-2 font-semibold">{formatCurrency(results.totalIdentifiedValue)}</span>
                  </div>
                </div>
              </div>

              {/* Rule Details */}
              <div className="space-y-4">
                <h4 className="font-semibold text-[#0B3C5D]">Rule-by-Rule Analysis</h4>
                {results.ruleResults.map((rule) => (
                  <div key={rule.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start gap-3">
                      <rule.icon className="h-5 w-5 text-[#C9A227] mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <h5 className="font-medium text-[#0B3C5D] mb-1">{rule.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{rule.description}</p>
                        <p className={`text-sm font-medium ${
                          rule.result.passes ? 'text-green-700' : 'text-red-700'
                        }`}>
                          {rule.result.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Important Notes */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-800 mb-3">Important Identification Notes</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Identification must be in writing and delivered to your Qualified Intermediary within 45 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Properties must be &ldquo;like-kind&rdquo; - real property held for productive use or investment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>You can use different identification rules for different exchanges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>The 95% Rule applies to what you actually acquire, not what you identify</span>
                  </li>
                </ul>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm text-amber-700">
                  <strong>Disclaimer:</strong> This tool provides educational guidance only and does not constitute legal or tax advice.
                  Always consult with a Qualified Intermediary and tax advisor to ensure compliance with IRS rules.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                Enter relinquished property value and identified replacement properties above to validate against IRS identification rules.
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
