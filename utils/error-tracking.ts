export function initErrorTracking() {
  if (typeof window !== 'undefined') {
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo)
      // Add your error tracking service here
      return false
    }
  }
} 