(function () {
  'use strict';

  function reportWhatsAppClick(url) {
    if (typeof window.gtag !== 'function') return false;
    var navigated = false;
    var timer;
    function navigate() {
      if (!url || navigated) return;
      navigated = true;
      window.clearTimeout(timer);
      window.location.assign(url);
    }
    if (url) timer = window.setTimeout(navigate, 1000);
    try {
      window.gtag('event', 'conversion', {
        send_to: 'AW-16549271570/y35eCLTOpKodEJKwp9M9',
        event_callback: navigate,
        event_timeout: 800
      });
    } catch (error) {
      if (timer) window.clearTimeout(timer);
      return false;
    }
    return true;
  }

  document.addEventListener('click', function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    var link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;
    var destination;
    try { destination = new URL(link.href, window.location.href); }
    catch (error) { return; }
    if (destination.protocol !== 'https:' || destination.hostname !== 'wa.me' ||
        destination.pathname.replace(/\//g, '') !== '905355910390') return;

    var target = link.getAttribute('target');
    var sameTab = (!target || target === '_self') &&
      !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
    // Keep native new-tab behavior. Delay same-tab navigation briefly for measurement,
    // with an independent timeout so a blocked Google tag cannot strand the visitor.
    if (reportWhatsAppClick(sameTab ? link.href : undefined) && sameTab) {
      event.preventDefault();
    }
  });
})();
