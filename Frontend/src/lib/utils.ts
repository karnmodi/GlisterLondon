/**
 * Convert MongoDB Decimal128 to number
 * Handles both plain numbers and Decimal128 objects
 */
export function toNumber(value: any): number {
  if (value === null || value === undefined) return 0
  
  // If it's already a number, return it
  if (typeof value === 'number') return value
  
  // If it's a Decimal128 object from MongoDB
  if (value && typeof value === 'object' && '$numberDecimal' in value) {
    return parseFloat(value.$numberDecimal)
  }
  
  // If it's a string, try to parse it
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    return isNaN(parsed) ? 0 : parsed
  }
  
  return 0
}

/**
 * Format number as currency
 */
export function formatCurrency(value: any, currency: string = 'GBP'): string {
  const num = toNumber(value)
  return `£${num.toFixed(2)}`
}

/**
 * Format a size value with its unit for display.
 * Examples: "45mm", "8° Degree", "1.5 inch", "Custom label"
 */
export function formatSizeDisplay(size: {
  sizeMM?: number
  sizeUnit?: string
  customUnitLabel?: string
}): string {
  const value = size.sizeMM ?? 0
  const unit = size.sizeUnit ?? 'MM'

  switch (unit) {
    case 'Inch':
      return `${value} inch`
    case 'Degree':
      return `${value}° Degree`
    case 'Custom':
      return size.customUnitLabel ? `${value} ${size.customUnitLabel}` : `${value}`
    default:
      return `${value}mm`
  }
}

/**
 * Smart size display for cart/order contexts.
 * - For non-MM units (Degree, Inch, Custom): use formatSizeDisplay (e.g. "8° Degree")
 * - For MM (including legacy orders stored before sizeUnit was added): use name if available
 *   to avoid redundant output like "15° Degree (15mm)"
 * - Falls back to formatSizeDisplay when no name is present
 */
export function getSizeDisplayLabel(size: {
  name?: string
  sizeMM?: number
  sizeUnit?: string
  customUnitLabel?: string
}): string {
  const unit = size.sizeUnit ?? 'MM'
  if (unit !== 'MM') {
    return formatSizeDisplay(size)
  }
  if (size.name?.trim()) {
    return size.name.trim()
  }
  return formatSizeDisplay(size)
}

