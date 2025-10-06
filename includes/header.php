<?php // Tailwind header ?>
<?php include __DIR__ . '/topnav.php'; ?>
<header class="bg-blue-900 text-white">
  <div class="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
    <a href="/newsite/index.php" class="flex items-center gap-3">
      <img src="../img/logo/swarnandhra-logo.png" alt="Swarnandhra" class="h-10 w-auto">
      <span class="sr-only">Swarnandhra</span>
    </a>
    <?php include __DIR__ . '/mainnav.php'; ?>
    <button class="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-blue-800" aria-label="Open menu" id="mobileMenuButton">
      <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    </button>
  </div>
  <div id="mobileMenu" class="md:hidden hidden border-t border-blue-800">
    <?php include __DIR__ . '/mainnav_mobile.php'; ?>
  </div>
  <script>
    (function(){
      var btn = document.getElementById('mobileMenuButton');
      var menu = document.getElementById('mobileMenu');
      if(btn && menu){
        btn.addEventListener('click', function(){
          menu.classList.toggle('hidden');
        });
      }
    })();
  </script>
</header>