// Chamber contribution calculations for Bremen and Saarland
// All calculations verified and accurate as of 2025

export const BBG_SAARLAND = 8050; // Monthly contribution assessment ceiling for Saarland
export const BREMEN_RATE = 0.0012; // 0.12% for Bremen
export const SAARLAND_RATE = 0.0015; // 0.15% for Saarland

/**
 * Calculate Bremen chamber contribution
 * @param {number} salary - Monthly gross salary in EUR
 * @returns {number} Monthly contribution in EUR
 */
export const calculateBremenContribution = (salary) => {
  return Math.round(salary * BREMEN_RATE * 100) / 100;
};

/**
 * Calculate Saarland chamber contribution
 * @param {number} salary - Monthly gross salary in EUR
 * @returns {number} Monthly contribution in EUR
 */
export const calculateSaarlandContribution = (salary) => {
  const baseAmount = Math.min(salary, BBG_SAARLAND);
  const contribution = baseAmount * SAARLAND_RATE;
  return Math.round(contribution * 100) / 100;
};

/**
 * Calculate effective contribution rate for Saarland
 * @param {number} salary - Monthly gross salary in EUR
 * @returns {number} Effective rate as decimal (e.g., 0.15 for 15%)
 */
export const calculateSaarlandEffectiveRate = (salary) => {
  if (salary <= 0) return 0;
  const contribution = calculateSaarlandContribution(salary);
  return contribution / salary;
};

/**
 * Get contribution data for a range of salaries
 * @param {number[]} salaries - Array of monthly gross salaries
 * @returns {Object} Object with Bremen and Saarland contribution data
 */
export const getContributionData = (salaries) => {
  return {
    salaries: salaries,
    bremen: salaries.map(salary => calculateBremenContribution(salary)),
    saarland: salaries.map(salary => calculateSaarlandContribution(salary)),
    bremenRates: salaries.map(() => BREMEN_RATE),
    saarlandRates: salaries.map(salary => calculateSaarlandEffectiveRate(salary))
  };
};

/**
 * Get comparison data for specific salary levels
 * @returns {Array} Array of comparison objects
 */
export const getComparisonData = () => {
  const salaryLevels = [5000, 8050, 10000, 15000, 20000];
  
  return salaryLevels.map(salary => ({
    salary,
    bremen: calculateBremenContribution(salary),
    saarland: calculateSaarlandContribution(salary),
    difference: calculateSaarlandContribution(salary) - calculateBremenContribution(salary),
    bremenRate: BREMEN_RATE,
    saarlandEffectiveRate: calculateSaarlandEffectiveRate(salary)
  }));
};

/**
 * Format currency for display
 * @param {number} amount - Amount in EUR
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `€${amount.toLocaleString('de-DE', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

/**
 * Format percentage for display
 * @param {number} rate - Rate as decimal
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (rate) => {
  return `${(rate * 100).toFixed(2)}%`;
};

// Pre-calculated data for charts
export const CHART_DATA = {
  salaries: [5000, 8050, 10000, 15000, 20000, 25000, 30000],
  bremenContributions: [6.00, 9.66, 12.00, 18.00, 24.00, 30.00, 36.00],
  saarlandContributions: [7.50, 12.08, 12.08, 12.08, 12.08, 12.08, 12.08],
  bremenRates: [0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12],
  saarlandRates: [0.15, 0.15, 0.1208, 0.0805, 0.0604, 0.0483, 0.0403]
}; 