<?php
// Tailwind banner + tabs section using dummy data (no MySQL)
$examNotices = [
  ['title' => 'Mid-term exams schedule released', 'date' => '2025-10-01', 'link' => '#'],
  ['title' => 'Lab internal assessment dates', 'date' => '2025-10-08', 'link' => '#'],
  ['title' => 'Hall tickets distribution notice', 'date' => '2025-10-12', 'link' => '#'],
];
$newsItems = [
  ['title' => 'Tech symposium announced', 'date' => '2025-09-24', 'link' => '#'],
  ['title' => 'New research lab inaugurated', 'date' => '2025-09-30', 'link' => '#'],
  ['title' => 'Workshop on AI Ethics', 'date' => '2025-10-03', 'link' => '#'],
];
$academicsItems = [
  ['title' => 'R-24 curriculum updates', 'date' => '2025-09-15', 'link' => '../r24syllabusug.php'],
  ['title' => 'Academic council meeting minutes', 'date' => '2025-09-20', 'link' => '../academiccouncil.php'],
  ['title' => 'Syllabus addendum published', 'date' => '2025-10-02', 'link' => '../curriculum'],
];
$placementsItems = [
  ['title' => 'Campus drive: Company A', 'date' => '2025-10-10', 'link' => '#'],
  ['title' => 'Results: Company B shortlist', 'date' => '2025-10-05', 'link' => '#'],
  ['title' => 'Mock interviews schedule', 'date' => '2025-09-28', 'link' => '#'],
];
?>

<section class="relative isolate overflow-hidden bg-white">
  <div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
    <div class="rounded-xl bg-blue-900 text-white overflow-hidden">
      <div class="grid md:grid-cols-2">
        <div class="p-8 md:p-12 flex items-center">
          <div>
            <h1 class="text-3xl sm:text-4xl font-bold">Swarnandhra College of Engineering and Technology</h1>
            <p class="mt-4 text-sm sm:text-base text-blue-100">Exploring the refreshed Tailwind design with sample content and tabs.</p>
            <div class="mt-6 flex gap-3">
              <a href="../index.php" class="rounded-md bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20">Go to current site</a>
              <a href="../iqac.php" class="rounded-md bg-white text-blue-900 px-4 py-2 text-sm font-semibold hover:bg-blue-50">IQAC</a>
            </div>
          </div>
        </div>
        <div class="relative h-56 sm:h-72 md:h-full">
          <video class="absolute inset-0 h-full w-full object-cover" src="../img/data/video.mp4" autoplay muted loop playsinline></video>
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mt-8">
      <div class="flex gap-2">
        <button class="tab-btn rounded-md px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200" data-tab="tab-exam">Examination</button>
        <button class="tab-btn rounded-md px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200" data-tab="tab-news">News</button>
        <button class="tab-btn rounded-md px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200" data-tab="tab-academics">Academics</button>
        <button class="tab-btn rounded-md px-3 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200" data-tab="tab-placements">Placements</button>
      </div>

      <div class="mt-4 rounded-lg border bg-white">
        <div id="tab-exam" class="tab-panel p-4">
          <ul class="divide-y">
            <?php foreach ($examNotices as $item): ?>
              <li class="py-3 flex items-center justify-between">
                <div>
                  <a href="<?= $item['link'] ?>" class="font-medium text-blue-700 hover:underline"><?= htmlspecialchars($item['title']) ?></a>
                  <p class="text-xs text-gray-500 mt-1">Date: <?= htmlspecialchars($item['date']) ?></p>
                </div>
                <a href="<?= $item['link'] ?>" class="text-xs text-blue-600 hover:underline">View</a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div id="tab-news" class="tab-panel p-4 hidden">
          <ul class="divide-y">
            <?php foreach ($newsItems as $item): ?>
              <li class="py-3 flex items-center justify-between">
                <div>
                  <a href="<?= $item['link'] ?>" class="font-medium text-blue-700 hover:underline"><?= htmlspecialchars($item['title']) ?></a>
                  <p class="text-xs text-gray-500 mt-1">Date: <?= htmlspecialchars($item['date']) ?></p>
                </div>
                <a href="<?= $item['link'] ?>" class="text-xs text-blue-600 hover:underline">Read</a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div id="tab-academics" class="tab-panel p-4 hidden">
          <ul class="divide-y">
            <?php foreach ($academicsItems as $item): ?>
              <li class="py-3 flex items-center justify-between">
                <div>
                  <a href="<?= $item['link'] ?>" class="font-medium text-blue-700 hover:underline"><?= htmlspecialchars($item['title']) ?></a>
                  <p class="text-xs text-gray-500 mt-1">Date: <?= htmlspecialchars($item['date']) ?></p>
                </div>
                <a href="<?= $item['link'] ?>" class="text-xs text-blue-600 hover:underline">Open</a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div id="tab-placements" class="tab-panel p-4 hidden">
          <ul class="divide-y">
            <?php foreach ($placementsItems as $item): ?>
              <li class="py-3 flex items-center justify-between">
                <div>
                  <a href="<?= $item['link'] ?>" class="font-medium text-blue-700 hover:underline"><?= htmlspecialchars($item['title']) ?></a>
                  <p class="text-xs text-gray-500 mt-1">Date: <?= htmlspecialchars($item['date']) ?></p>
                </div>
                <a href="<?= $item['link'] ?>" class="text-xs text-blue-600 hover:underline">Details</a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Simple tabs behavior
    (function(){
      var buttons = document.querySelectorAll('.tab-btn');
      var panels = document.querySelectorAll('.tab-panel');
      function showPanel(id){
        panels.forEach(function(p){ p.classList.add('hidden'); });
        var el = document.getElementById(id);
        if(el){ el.classList.remove('hidden'); }
      }
      buttons.forEach(function(btn){
        btn.addEventListener('click', function(){
          showPanel(btn.getAttribute('data-tab'));
        });
      });
      // default
      showPanel('tab-exam');
    })();
  </script>
</section>