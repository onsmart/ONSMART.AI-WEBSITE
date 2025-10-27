
// Background Sync Handlers
export async function syncContactForm() {
  try {
    console.log('SW: Syncing contact form');
  } catch (error) {
    console.error('SW: Contact form sync failed:', error);
  }
}

export async function syncDiagnosticoForm() {
  try {
    console.log('SW: Syncing diagnostico form');
  } catch (error) {
    console.error('SW: Diagnostico form sync failed:', error);
  }
}

export function handleBackgroundSync(event) {
  console.log('SW: Background sync:', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
  
  if (event.tag === 'diagnostico-form-sync') {
    event.waitUntil(syncDiagnosticoForm());
  }
}
