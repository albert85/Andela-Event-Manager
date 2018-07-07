/**
 * @description This dispatches status loading
 * @param {string} type
 * @returns {string} type
 */
export const checkPageStatus = type => ({
  type,
});

  /**
   * @description This dispatches success messages
   * @param {string} type
   * @returns {string} type
   */
export const successMessage = type => ({
  type,
});

  /**
   * @description This dispatches error messages
   * @param {string} type
   * @returns {string} type
   */
export const errorMessage = type => ({
  type,
});
