
# Create root directory
New-Item -Path "portfolio-website" -ItemType Directory -Force

# Create public directory and files
New-Item -Path "portfolio-website\public" -ItemType Directory -Force
New-Item -Path "portfolio-website\public\index.html" -ItemType File -Force
New-Item -Path "portfolio-website\public\favicon.ico" -ItemType File -Force
New-Item -Path "portfolio-website\public\manifest.json" -ItemType File -Force

# Create public/assets directories
New-Item -Path "portfolio-website\public\assets\images\projects" -ItemType Directory -Force
New-Item -Path "portfolio-website\public\assets\images\certificates" -ItemType Directory -Force
New-Item -Path "portfolio-website\public\assets\images\posters" -ItemType Directory -Force
New-Item -Path "portfolio-website\public\assets\documents\certificates" -ItemType Directory -Force
New-Item -Path "portfolio-website\public\assets\images\profile.jpg" -ItemType File -Force
New-Item -Path "portfolio-website\public\assets\documents\cv.pdf" -ItemType File -Force

# Create src directory structure
New-Item -Path "portfolio-website\src\components\common\Header" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\common\Footer" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\common\UI" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\common\Layout" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Home" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\About" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Projects" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Publications" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Experience" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Talks" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Education" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Blog" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Contact" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Consultancy" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Resources" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Discussions" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\sections\Posters" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\features\ThemeToggle" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\features\Search" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\components\features\Analytics" -ItemType Directory -Force

# Create component files
New-Item -Path "portfolio-website\src\components\common\Header\Header.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\Header\Navigation.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\Header\MobileMenu.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\Footer\Footer.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\UI\Button.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\UI\Card.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\UI\Modal.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\UI\Loading.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\UI\ErrorBoundary.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\Layout\Layout.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\common\Layout\PageWrapper.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Home\Hero.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Home\ProfileImage.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Home\QuickStats.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\About\About.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\About\Skills.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\About\Timeline.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Projects\Projects.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Projects\ProjectCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Projects\ProjectFilter.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Projects\ProjectModal.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Publications\Publications.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Publications\PublicationCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Publications\PublicationSearch.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Experience\Experience.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Experience\WorkCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Experience\ResponsibilityCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Talks\Talks.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Talks\TalkCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Talks\TalkCalendar.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Education\Education.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Education\CourseGrid.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Education\CertificateCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Blog\Blog.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Blog\BlogCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Blog\BlogPost.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Blog\BlogSearch.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Contact\Contact.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Contact\ContactForm.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Contact\SocialLinks.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Consultancy\Consultancy.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Consultancy\ServiceCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Consultancy\TestimonialCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Resources\Resources.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Resources\ResourceCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Resources\ResourceFilter.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Discussions\Discussions.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Discussions\DiscussionCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Discussions\NewDiscussion.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Posters\Posters.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Posters\PosterCard.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\sections\Posters\PosterModal.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\features\ThemeToggle\ThemeToggle.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\features\Search\GlobalSearch.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\components\features\Analytics\Analytics.jsx" -ItemType File -Force

# Create hooks directory and files
New-Item -Path "portfolio-website\src\hooks" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\hooks\useTheme.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\hooks\useLocalStorage.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\hooks\useScroll.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\hooks\useDebounce.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\hooks\useApi.js" -ItemType File -Force

# Create context directory and files
New-Item -Path "portfolio-website\src\context" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\context\ThemeContext.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\context\AppContext.jsx" -ItemType File -Force

# Create data directory and files
New-Item -Path "portfolio-website\src\data" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\data\projects.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\data\publications.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\data\experience.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\data\talks.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\data\education.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\data\blog.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\data\skills.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\data\personal.js" -ItemType File -Force

# Create utils directory and files
New-Item -Path "portfolio-website\src\utils" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\utils\constants.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\utils\helpers.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\utils\api.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\utils\animations.js" -ItemType File -Force
New-Item -Path "portfolio-website\src\utils\seo.js" -ItemType File -Force

# Create styles directory and files
New-Item -Path "portfolio-website\src\styles" -ItemType Directory -Force
New-Item -Path "portfolio-website\src\styles\globals.css" -ItemType File -Force
New-Item -Path "portfolio-website\src\styles\components.css" -ItemType File -Force
New-Item -Path "portfolio-website\src\styles\animations.css" -ItemType File -Force

# Create src root files
New-Item -Path "portfolio-website\src\App.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\main.jsx" -ItemType File -Force
New-Item -Path "portfolio-website\src\index.css" -ItemType File -Force

# Create content directory and files
New-Item -Path "portfolio-website\content\blog\posts" -ItemType Directory -Force
New-Item -Path "portfolio-website\content\pages" -ItemType Directory -Force
New-Item -Path "portfolio-website\content\blog\posts\post-1.md" -ItemType File -Force
New-Item -Path "portfolio-website\content\blog\posts\post-2.md" -ItemType File -Force
New-Item -Path "portfolio-website\content\blog\posts\post-3.md" -ItemType File -Force
New-Item -Path "portfolio-website\content\blog\index.js" -ItemType File -Force
New-Item -Path "portfolio-website\content\pages\about.md" -ItemType File -Force
New-Item -Path "portfolio-website\content\pages\cv.md" -ItemType File -Force

# Create root configuration files
New-Item -Path "portfolio-website\.env" -ItemType File -Force
New-Item -Path "portfolio-website\.env.example" -ItemType File -Force
New-Item -Path "portfolio-website\.gitignore" -ItemType File -Force
New-Item -Path "portfolio-website\package.json" -ItemType File -Force
New-Item -Path "portfolio-website\tailwind.config.js" -ItemType File -Force
New-Item -Path "portfolio-website\vite.config.js" -ItemType File -Force
New-Item -Path "portfolio-website\README.md" -ItemType File -Force
New-Item -Path "portfolio-website\netlify.toml" -ItemType File -Force

Write-Host "Portfolio website folder structure created successfully!"
