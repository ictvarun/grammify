// Function to track page views
export function trackPageView(path: string) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-6SZM7EG7DZ', {
      page_path: path
    });
  }
}

// Function to track events
export function trackEvent(category: string, action: string, label?: string, value?: number) {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}