# ─── Unified Navbar Replacer ───────────────────────────────────────────────
# Replaces every <nav …>…</nav> block in each HTML with the standard navbar.

$dir = Split-Path -Parent $MyInvocation.MyCommand.Path

# The unified navbar HTML — same across ALL pages
$navHtml = @'
  <nav class="navbar" id="mainNav">
    <div class="container">
      <a href="index.html" class="nav-logo">Yamini Sappa</a>
      <div class="nav-right">
        <ul class="nav-menu">
          <li><a href="frontend-projects.html" id="nav-projects">Projects</a></li>
          <li><a href="design-projects.html"   id="nav-design">Design</a></li>
          <li><a href="index.html#about"        id="nav-about">About</a></li>
          <li><a href="index.html#contact"      id="nav-contact">Contact</a></li>
        </ul>
        <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
          <i class="fas fa-moon"></i>
        </button>
        <a href="./Yamini_Resume_Front%20End%20Developer.pdf" class="nav-resume" target="_blank" rel="noopener">Resume</a>
      </div>
    </div>
  </nav>

  <script>
    // Theme setup (run immediately)
    (function() {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();

    // Navbar scroll effect
    (function () {
      var nav = document.getElementById('mainNav');
      if (!nav) return;
      function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 40); }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    })();

    // Active link highlight
    (function () {
      var path = window.location.pathname.split('/').pop() || 'index.html';
      var map = {
        'frontend-projects.html': 'nav-projects',
        'design-projects.html': 'nav-design',
        'index.html': 'nav-about'
      };
      // sub-pages that belong to engineering
      var engineering = ['lms-group.html','news-app.html','lead-app.html','reels-interface.html',
        'ecommerce-dashboard.html','placement-automation.html','inventory.html',
        'streaming-dashboard.html'];
      // sub-pages that belong to design
      var design = ['design-system.html','topic-prep.html','topic-prep-admin.html',
        'skill-medha.html','all-projects.html','design-projects.html',
        'ecommerce.html','corporate-sites.html','graphic-design.html',
        'hospital-sites.html','wedding.html'];
      var targetId = map[path];
      if (!targetId) {
        if (engineering.includes(path)) targetId = 'nav-projects';
        else if (design.includes(path))  targetId = 'nav-design';
      }
      if (targetId) {
        var el = document.getElementById(targetId);
        if (el) el.classList.add('nav-active');
      }
    })();

    // Theme toggle bind
    window.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('theme-toggle');
        const icon = themeToggle ? themeToggle.querySelector('i') : null;
        
        function updateIcon() {
            if (!icon) return;
            icon.className = document.documentElement.getAttribute('data-theme') === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }

        if (themeToggle) {
            updateIcon();
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                if (currentTheme === 'dark') {
                    document.documentElement.removeAttribute('data-theme');
                    localStorage.setItem('theme', 'light');
                } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                }
                updateIcon();
            });
        }
    });
  </script>
'@

$htmlFiles = Get-ChildItem -Path $dir -Filter "*.html" -File

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # Match <nav ...> ... </nav> (potentially multi-line, non-greedy)
    $pattern = '(?s)<nav\b[^>]*>.*?</nav>'

    if ($content -match $pattern) {
        $newContent = [regex]::Replace($content, $pattern, $navHtml.Trim(), 'Singleline')

        # Remove any inline scroll script blocks we added previously to index.html
        $newContent = [regex]::Replace($newContent,
            '(?s)\s*<script>\s*//\s*Navbar shrink on scroll\s*const nav.*?</script>',
            '', 'Singleline')

        Set-Content $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "Updated: $($file.Name)"
    } else {
        Write-Host "Skipped (no nav found): $($file.Name)"
    }
}

Write-Host "`nDone! All navbars updated."
