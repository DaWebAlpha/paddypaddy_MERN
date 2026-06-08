# Tailwind CSS Real-World Project Examples

A comprehensive collection of copy-paste ready Tailwind CSS components and layouts for real-world projects. Each code block is followed by a detailed explanation of what every class does. Click any section below to jump directly to it.

## Table of Contents

- [1. Navigation & Headers](#1-navigation--headers)
- [2. Hero Sections](#2-hero-sections)
- [3. Feature Cards](#3-feature-cards)
- [4. Pricing Tables](#4-pricing-tables)
- [5. Testimonials](#5-testimonials)
- [6. Team/About Sections](#6-teamabout-sections)
- [7. Contact Forms](#7-contact-forms)
- [8. Footers](#8-footers)
- [9. Dashboard Layouts](#9-dashboard-layouts)
- [10. E-commerce Components](#10-e-commerce-components)
- [11. Authentication Pages](#11-authentication-pages)
- [12. Tables & Data Display](#12-tables--data-display)
- [13. Modals & Overlays](#13-modals--overlays)
- [14. Notifications & Alerts](#14-notifications--alerts)
- [15. Sidebar Layouts](#15-sidebar-layouts)

---

## 1. Navigation & Headers

### 1.1 Responsive Navbar with Logo

```html
<nav class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <a href="#" class="flex-shrink-0 flex items-center">
          <svg class="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          <span class="ml-2 text-xl font-bold text-gray-900">BrandName</span>
        </a>
      </div>
      <div class="hidden md:flex items-center space-x-8">
        <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Home</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Products</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">Services</a>
        <a href="#" class="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">About</a>
        <a href="#" class="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Get Started</a>
      </div>
      <div class="flex items-center md:hidden">
        <button type="button" class="text-gray-600 hover:text-gray-900 p-2">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `bg-white` | Sets background color to white |
| `shadow-md` | Applies medium drop shadow for depth |
| `max-w-7xl` | Constrains maximum width to 1280px (80rem) |
| `mx-auto` | Centers container horizontally with auto left/right margins |
| `px-4` | Horizontal padding of 1rem (16px) on mobile |
| `sm:px-6` | Horizontal padding increases to 1.5rem (24px) at 640px+ |
| `lg:px-8` | Horizontal padding increases to 2rem (32px) at 1024px+ |
| `flex` | Enables flexbox layout |
| `justify-between` | Distributes space between items (logo left, menu right) |
| `h-16` | Fixed height of 4rem (64px) for navbar |
| `items-center` | Vertically centers all flex items |
| `flex-shrink-0` | Prevents logo from shrinking when space is tight |
| `h-8 w-8` | Sets SVG icon to 2rem (32px) square |
| `text-blue-600` | Sets icon color to blue (hex #2563eb) |
| `ml-2` | Left margin of 0.5rem (8px) between icon and text |
| `text-xl` | Extra large font size (1.25rem / 20px) |
| `font-bold` | Bold font weight (700) |
| `text-gray-900` | Very dark gray text color (near black) |
| `hidden md:flex` | Hidden on mobile, becomes flex at 768px+ (responsive breakpoint) |
| `space-x-8` | Adds 2rem (32px) horizontal gap between menu items |
| `text-gray-600` | Medium gray text color (#4b5563) |
| `hover:text-blue-600` | Changes text to blue on mouse hover |
| `px-3 py-2` | Padding: 0.75rem horizontal, 0.5rem vertical |
| `text-sm` | Small font size (0.875rem / 14px) |
| `font-medium` | Medium font weight (500) |
| `transition-colors` | Smooth color transition animation on hover |
| `bg-blue-600` | Blue background for CTA button |
| `text-white` | White text color |
| `px-4 py-2` | Button padding: 1rem horizontal, 0.5rem vertical |
| `rounded-lg` | 0.5rem (8px) border radius for rounded corners |
| `hover:bg-blue-700` | Darker blue on hover for feedback |
| `md:hidden` | Visible only on mobile (hidden at 768px+) |
| `p-2` | Padding of 0.5rem (8px) around hamburger button |

---

### 1.2 Dark Navbar with Search

```html
<nav class="bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center space-x-8">
        <span class="text-xl font-bold">Dashboard</span>
        <div class="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1.5">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input type="text" placeholder="Search..." class="bg-transparent border-none focus:outline-none text-sm ml-2 text-white placeholder-gray-400 w-64">
        </div>
      </div>
      <div class="flex items-center space-x-4">
        <button class="p-2 rounded-lg hover:bg-gray-800 transition-colors relative">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
          <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" alt="Profile" class="h-8 w-8 rounded-full border-2 border-gray-700">
      </div>
    </div>
  </div>
</nav>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `bg-gray-900` | Very dark gray background (#111827) |
| `text-white` | White text for contrast on dark bg |
| `space-x-8` | 2rem gap between logo and search bar |
| `bg-gray-800` | Slightly lighter dark gray for search input container (#1f2937) |
| `rounded-lg` | Rounded corners on search container |
| `px-3 py-1.5` | Padding: 0.75rem horizontal, 0.375rem vertical |
| `text-gray-400` | Light gray for search icon (#9ca3af) |
| `bg-transparent` | Transparent background on input |
| `border-none` | Removes default input border |
| `focus:outline-none` | Removes blue outline on focus (replaced by custom styling) |
| `ml-2` | Gap between search icon and input text |
| `placeholder-gray-400` | Light gray placeholder text |
| `w-64` | Fixed width of 16rem (256px) for search input |
| `space-x-4` | 1rem gap between notification bell and avatar |
| `relative` | Establishes positioning context for notification dot |
| `hover:bg-gray-800` | Slight highlight on bell button hover |
| `absolute top-1 right-1` | Positions notification dot in top-right corner |
| `h-2 w-2` | Tiny 0.5rem (8px) dot |
| `bg-red-500` | Red color for notification indicator |
| `rounded-full` | Perfect circle for dot |
| `border-2 border-gray-700` | 2px border around avatar for definition |

---

### 1.3 Sticky Navbar with Dropdown

```html
<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16 items-center">
      <div class="flex items-center">
        <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SaaSify</span>
      </div>
      <div class="hidden md:flex items-center space-x-1">
        <a href="#" class="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-all">Home</a>
        <div class="relative group">
          <button class="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-all flex items-center">
            Products
            <svg class="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div class="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-xl">Analytics</a>
            <a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">Automation</a>
            <a href="#" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 last:rounded-b-xl">Reports</a>
          </div>
        </div>
        <a href="#" class="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-all">Pricing</a>
        <a href="#" class="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-gray-50 transition-all">Docs</a>
      </div>
      <div class="flex items-center space-x-3">
        <a href="#" class="text-gray-700 hover:text-blue-600 font-medium px-3 py-2">Sign In</a>
        <a href="#" class="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">Start Free</a>
      </div>
    </div>
  </div>
</nav>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `sticky top-0` | Sticks to top of viewport when scrolling |
| `z-50` | High z-index (50) ensures navbar stays above other content |
| `bg-white/80` | White background with 80% opacity (glassmorphism base) |
| `backdrop-blur-md` | Applies medium backdrop blur for frosted glass effect |
| `border-b border-gray-200` | Bottom border for subtle separation |
| `bg-gradient-to-r` | Horizontal gradient background (left to right) |
| `from-blue-600 to-purple-600` | Gradient from blue to purple |
| `bg-clip-text` | Clips background to text shape |
| `text-transparent` | Makes text transparent so gradient shows through |
| `space-x-1` | Tight 0.25rem spacing between nav items |
| `group` | Declares a group for child hover effects |
| `ml-1` | Small left margin for dropdown arrow |
| `transition-transform` | Animates transform property smoothly |
| `group-hover:rotate-180` | Rotates arrow 180deg when parent is hovered |
| `absolute top-full left-0` | Positions dropdown directly below button |
| `mt-1` | Small gap between button and dropdown |
| `w-56` | Dropdown width of 14rem (224px) |
| `shadow-lg` | Large shadow for dropdown elevation |
| `opacity-0 invisible` | Hidden by default (fully transparent + not interactive) |
| `group-hover:opacity-100 group-hover:visible` | Shows dropdown on parent hover |
| `transition-all duration-200` | All properties animate over 200ms |
| `first:rounded-t-xl` | Rounds top corners of first dropdown item |
| `last:rounded-b-xl` | Rounds bottom corners of last dropdown item |
| `shadow-blue-600/30` | Blue tinted shadow with 30% opacity |

---

## 2. Hero Sections

### 2.1 Split Hero with Image

```html
<section class="bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6">
          <span class="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
          New Feature Available
        </div>
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Build faster with <span class="text-blue-600">Tailwind CSS</span>
        </h1>
        <p class="mt-6 text-lg text-gray-600 leading-relaxed max-w-lg">
          Create stunning, responsive websites in half the time. Our components are production-ready and fully customizable.
        </p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4">
          <a href="#" class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30">
            Get Started Free
            <svg class="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </a>
          <a href="#" class="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
            Watch Demo
          </a>
        </div>
        <div class="mt-8 flex items-center gap-4 text-sm text-gray-500">
          <div class="flex -space-x-2">
            <img class="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="">
            <img class="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="">
            <img class="w-8 h-8 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="">
          </div>
          <span>Trusted by 10,000+ developers</span>
        </div>
      </div>
      <div class="relative">
        <div class="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-2xl"></div>
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" alt="Dashboard" class="relative rounded-2xl shadow-2xl border border-gray-200">
      </div>
    </div>
  </div>
</section>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `py-20 lg:py-28` | Vertical padding: 5rem mobile, 7rem at 1024px+ |
| `grid lg:grid-cols-2` | CSS Grid with 2 columns at 1024px+ |
| `gap-12` | 3rem gap between grid columns |
| `items-center` | Vertically centers grid items |
| `inline-flex` | Inline flex container (flows with text but uses flexbox) |
| `rounded-full` | Pill shape for badge |
| `bg-blue-50` | Very light blue background (#eff6ff) |
| `text-blue-700` | Darker blue text for badge |
| `mb-6` | Bottom margin 1.5rem to separate from heading |
| `w-2 h-2` | Tiny dot indicator (0.5rem) |
| `rounded-full` | Makes dot circular |
| `mr-2` | Right margin between dot and text |
| `text-4xl sm:text-5xl lg:text-6xl` | Responsive heading: 2.25rem -> 3rem -> 3.75rem |
| `font-extrabold` | Extra bold weight (800) |
| `leading-tight` | Tight line height (1.25) for headings |
| `mt-6` | Top margin 1.5rem after heading |
| `text-lg` | Large paragraph text (1.125rem) |
| `leading-relaxed` | Relaxed line height (1.625) for readability |
| `max-w-lg` | Max width 32rem (512px) to limit line length |
| `flex-col sm:flex-row` | Stack buttons vertically on mobile, horizontal at 640px+ |
| `gap-4` | 1rem gap between buttons |
| `inline-flex items-center justify-center` | Centers content and aligns icon with text |
| `px-8 py-4` | Generous padding: 2rem horizontal, 1rem vertical |
| `text-base` | Base font size (1rem) |
| `rounded-xl` | Larger rounding: 0.75rem (12px) |
| `shadow-lg shadow-blue-600/30` | Large shadow with blue tint |
| `bg-gray-100` | Light gray for secondary button |
| `text-gray-700` | Dark gray text for secondary button |
| `hover:bg-gray-200` | Slightly darker on hover |
| `-space-x-2` | Negative margin creates overlapping avatar effect |
| `border-2 border-white` | White border makes avatars pop against each other |
| `relative` | Establishes context for absolute glow |
| `absolute -inset-4` | Glow extends 1rem outside image on all sides |
| `bg-gradient-to-r from-blue-600 to-purple-600` | Blue-to-purple gradient glow |
| `opacity-20` | Very subtle glow (20% opacity) |
| `blur-2xl` | Heavy blur for soft glow effect |
| `shadow-2xl` | Extra large shadow on image |

---

### 2.2 Centered Hero with Gradient Background

```html
<section class="relative bg-gray-900 overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-purple-900"></div>
  <div class="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-20"></div>
  <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
    <h1 class="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight">
      The Future of <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Web Design</span>
    </h1>
    <p class="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
      Powerful, intuitive tools that help you build beautiful websites without writing a single line of custom CSS.
    </p>
    <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <button class="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
        Start Building Now
      </button>
      <button class="px-8 py-4 border border-gray-600 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
        View Documentation
      </button>
    </div>
    <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
      <div class="text-center">
        <div class="text-3xl font-bold text-white">50K+</div>
        <div class="text-sm text-gray-400 mt-1">Active Users</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-white">99.9%</div>
        <div class="text-sm text-gray-400 mt-1">Uptime</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-white">24/7</div>
        <div class="text-sm text-gray-400 mt-1">Support</div>
      </div>
      <div class="text-center">
        <div class="text-3xl font-bold text-white">4.9/5</div>
        <div class="text-sm text-gray-400 mt-1">Rating</div>
      </div>
    </div>
  </div>
</section>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `relative` | Context for layered absolute backgrounds |
| `overflow-hidden` | Clips anything extending outside section |
| `absolute inset-0` | Covers entire section (top/right/bottom/left: 0) |
| `bg-gradient-to-br` | Diagonal gradient (bottom-right direction) |
| `from-blue-900 via-gray-900 to-purple-900` | 3-stop gradient: blue -> gray -> purple |
| `bg-[url(...)]` | Inline SVG pattern as background image |
| `opacity-20` | Pattern at 20% opacity (subtle texture) |
| `relative` | Brings content above absolute backgrounds |
| `text-center` | Centers all text |
| `tracking-tight` | Reduced letter spacing for large headings |
| `text-gray-300` | Light gray for paragraph (readable on dark bg) |
| `max-w-2xl` | Limits paragraph width to 42rem (672px) |
| `mx-auto` | Centers paragraph |
| `justify-center` | Centers buttons horizontally |
| `border border-gray-600` | Subtle border for ghost button |
| `hover:bg-gray-800` | Dark hover state for ghost button |
| `mt-16` | Large top margin (4rem) before stats |
| `grid-cols-2 md:grid-cols-4` | 2 columns mobile, 4 columns at 768px+ |
| `gap-8` | 2rem gap between stat items |
| `max-w-3xl` | Stats container max width 48rem |
| `text-3xl` | Large stat numbers (1.875rem) |
| `mt-1` | Small top margin between number and label |

---

### 2.3 Minimal Hero with Large Typography

```html
<section class="bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
    <div class="max-w-3xl">
      <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight">
        Design without limits.
      </h1>
      <p class="mt-8 text-xl text-gray-500 leading-relaxed max-w-xl">
        We provide the tools you need to create exceptional digital experiences. From concept to launch, we've got you covered.
      </p>
      <div class="mt-10">
        <a href="#" class="group inline-flex items-center text-lg font-semibold text-blue-600 hover:text-blue-700">
          Explore our work
          <svg class="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `py-32` | Very large vertical padding: 8rem (128px) |
| `max-w-3xl` | Content constrained to 48rem (768px) |
| `text-5xl sm:text-6xl lg:text-7xl` | Responsive: 3rem -> 3.75rem -> 4.5rem |
| `font-black` | Heaviest weight (900) |
| `leading-[1.1]` | Custom tight line height (1.1) using arbitrary value |
| `tracking-tight` | Reduced letter spacing |
| `mt-8` | 2rem top margin after heading |
| `text-xl` | 1.25rem paragraph size |
| `text-gray-500` | Medium gray for softer text |
| `leading-relaxed` | 1.625 line height for readability |
| `max-w-xl` | 36rem (576px) max width for paragraph |
| `mt-10` | 2.5rem top margin before CTA |
| `group` | Enables group-hover on child arrow |
| `transition-transform` | Smooth arrow movement |
| `group-hover:translate-x-1` | Arrow moves right 0.25rem on hover |
| `ml-2` | Space between text and arrow icon |

---

## 3. Feature Cards

### 3.1 Three-Column Feature Grid

```html
<section class="bg-gray-50 py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Everything you need</h2>
      <p class="mt-4 text-lg text-gray-600">Powerful features to help you build better products</p>
    </div>
    <div class="grid md:grid-cols-3 gap-8">
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
        <p class="text-gray-600 leading-relaxed">Optimized for speed with minimal load times. Your users will never wait for content to appear.</p>
      </div>
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
        <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">Secure by Default</h3>
        <p class="text-gray-600 leading-relaxed">Enterprise-grade security built into every component. Your data is always protected.</p>
      </div>
      <div class="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
        <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
          <svg class="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">Fully Responsive</h3>
        <p class="text-gray-600 leading-relaxed">Looks perfect on any device. Mobile, tablet, or desktop - your layout adapts seamlessly.</p>
      </div>
    </div>
  </div>
</section>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `bg-gray-50` | Very light gray section background (#f9fafb) |
| `text-center` | Centers section heading |
| `mb-16` | Large bottom margin (4rem) after heading |
| `sm:text-4xl` | Heading grows to 2.25rem at 640px+ |
| `md:grid-cols-3` | 3-column grid at 768px+ |
| `gap-8` | 2rem gap between cards |
| `rounded-2xl` | Large rounding: 1rem (16px) |
| `p-8` | Generous padding: 2rem (32px) |
| `shadow-sm` | Small subtle shadow |
| `hover:shadow-lg` | Shadow grows on hover for elevation effect |
| `transition-shadow` | Smooth shadow transition |
| `border border-gray-100` | Very light border for definition |
| `w-12 h-12` | 3rem (48px) icon container |
| `bg-blue-100` | Light blue icon background (#dbeafe) |
| `rounded-xl` | 0.75rem (12px) rounded icon container |
| `flex items-center justify-center` | Centers icon inside container |
| `mb-6` | 1.5rem margin below icon |
| `w-6 h-6` | 1.5rem (24px) icon size |
| `text-blue-600` | Blue icon color |
| `text-xl` | 1.25rem heading size |
| `mb-3` | 0.75rem margin below heading |
| `text-gray-600` | Medium gray body text |
| `leading-relaxed` | 1.625 line height for comfortable reading |

---

### 3.2 Feature Cards with Icons and Links

```html
<section class="bg-white py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all hover:shadow-md">
        <div class="flex items-start justify-between">
          <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <span class="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">Popular</span>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-gray-900">Team Collaboration</h3>
        <p class="mt-2 text-gray-600 text-sm">Work together in real-time with your entire team. Share ideas, assign tasks, and track progress.</p>
        <a href="#" class="mt-4 inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
          Learn more
          <svg class="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      <div class="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all hover:shadow-md">
        <div class="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-gray-900">Advanced Analytics</h3>
        <p class="mt-2 text-gray-600 text-sm">Get deep insights into your data with beautiful charts and comprehensive reporting tools.</p>
        <a href="#" class="mt-4 inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
          Learn more
          <svg class="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
      <div class="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-all hover:shadow-md">
        <div class="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-semibold text-gray-900">Cloud Integration</h3>
        <p class="mt-2 text-gray-600 text-sm">Seamlessly connect with your favorite cloud services. Sync data across all platforms instantly.</p>
        <a href="#" class="mt-4 inline-flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
          Learn more
          <svg class="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `group` | Enables hover effects on children when parent is hovered |
| `relative` | Positioning context for potential absolute elements |
| `hover:border-blue-300` | Border turns blue on hover |
| `transition-all` | All properties animate smoothly |
| `hover:shadow-md` | Medium shadow appears on hover |
| `items-start` | Aligns icon and badge to top |
| `justify-between` | Pushes icon left, badge right |
| `bg-orange-100` | Light orange icon background (#ffedd5) |
| `rounded-lg` | 0.5rem (8px) rounding |
| `text-xs` | Extra small text (0.75rem) for badge |
| `text-gray-400` | Light gray badge text |
| `bg-gray-100` | Light gray badge background |
| `px-2 py-1` | Small badge padding |
| `rounded` | Slight rounding (0.25rem) for badge |
| `mt-4` | 1rem top margin after icon row |
| `text-lg` | 1.125rem heading |
| `font-semibold` | Semibold weight (600) |
| `mt-2` | 0.5rem top margin after heading |
| `text-sm` | 0.875rem body text |
| `inline-flex items-center` | Horizontal link layout with centered icon |
| `group-hover:text-blue-700` | Link darkens on card hover |
| `ml-1` | Small gap between "Learn more" and arrow |
| `transition-transform` | Smooth arrow animation |
| `group-hover:translate-x-1` | Arrow slides right on card hover |

---

### 3.3 Bento Grid Features

```html
<section class="bg-gray-50 py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      <div class="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold text-gray-900">Real-time Performance</h3>
        </div>
        <p class="text-gray-600 mb-6">Monitor your application performance in real-time with our advanced dashboard. Get instant alerts and detailed reports.</p>
        <div class="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div class="flex items-end gap-2 h-24">
            <div class="w-1/6 bg-blue-500 rounded-t h-[40%]"></div>
            <div class="w-1/6 bg-blue-500 rounded-t h-[60%]"></div>
            <div class="w-1/6 bg-blue-500 rounded-t h-[30%]"></div>
            <div class="w-1/6 bg-blue-500 rounded-t h-[80%]"></div>
            <div class="w-1/6 bg-blue-500 rounded-t h-[50%]"></div>
            <div class="w-1/6 bg-blue-600 rounded-t h-[90%]"></div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-3xl p-8 border border-gray-200">
        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Auto-Deploy</h3>
        <p class="text-gray-600 text-sm">Push to deploy. Your code goes live automatically with zero downtime.</p>
      </div>
      <div class="bg-white rounded-3xl p-8 border border-gray-200">
        <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">End-to-End Encryption</h3>
        <p class="text-gray-600 text-sm">Your data is encrypted at rest and in transit. Enterprise-grade security.</p>
      </div>
      <div class="md:col-span-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Team Management</h3>
        </div>
        <p class="text-blue-100 mb-6">Manage your entire team with role-based access control. Invite members, set permissions, and track activity.</p>
        <div class="flex -space-x-3">
          <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face" alt="">
          <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" alt="">
          <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" alt="">
          <img class="w-10 h-10 rounded-full border-2 border-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face" alt="">
          <div class="w-10 h-10 rounded-full border-2 border-white bg-white/20 flex items-center justify-center text-sm font-medium">+12</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `auto-rows-fr` | Grid rows automatically size to equal fraction |
| `md:col-span-2` | Item spans 2 columns at 768px+ (wide card) |
| `rounded-3xl` | Extra large rounding: 1.5rem (24px) |
| `gap-4` | Tight 1rem gap between bento items |
| `gap-3` | 0.75rem gap between icon and heading |
| `rounded-full` | Circular icon container |
| `h-24` | Fixed 6rem height for chart container |
| `items-end` | Bars align to bottom (chart baseline) |
| `gap-2` | Small gap between bars |
| `w-1/6` | Each bar is 1/6 of container width |
| `rounded-t` | Rounds only top corners (bar tops) |
| `h-[40%]` | Arbitrary height: 40% of container (inline style alternative) |
| `bg-blue-600` | Last bar slightly darker for emphasis |
| `bg-gradient-to-br` | Diagonal gradient for featured card |
| `from-blue-600 to-purple-600` | Blue to purple gradient |
| `text-white` | White text on colored background |
| `bg-white/20` | Semi-transparent white icon background |
| `text-blue-100` | Very light blue for paragraph (subtle on gradient) |
| `-space-x-3` | Negative margin creates overlapping avatar stack |
| `border-2 border-white` | White borders separate overlapping avatars |
| `bg-white/20` | Semi-transparent background for "+12" counter |


---

### 11.2 Signup Page

```html
<div class="min-h-screen bg-white flex">
  <div class="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-purple-700 items-center justify-center p-12">
    <div class="max-w-lg text-white">
      <h2 class="text-4xl font-bold mb-6">Start your journey today</h2>
      <p class="text-lg text-blue-100 mb-8">Join thousands of teams who use our platform to build better products faster.</p>
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </div>
          <span>Free 14-day trial</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </div>
          <span>No credit card required</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
          </div>
          <span>Cancel anytime</span>
        </div>
      </div>
    </div>
  </div>
  <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
    <div class="max-w-md w-full">
      <h2 class="text-3xl font-bold text-gray-900 mb-2">Create your account</h2>
      <p class="text-gray-600 mb-8">Already have an account? <a href="#" class="text-blue-600 font-medium hover:text-blue-500">Sign in</a></p>
      <form class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First name</label>
            <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="John">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last name</label>
            <input type="text" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Doe">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input type="email" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input type="password" class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Min. 8 characters">
        </div>
        <div class="flex items-center">
          <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
          <label class="ml-2 block text-sm text-gray-900">I agree to the <a href="#" class="text-blue-600 font-medium">Terms</a> and <a href="#" class="text-blue-600 font-medium">Privacy Policy</a></label>
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          Create account
        </button>
      </form>
    </div>
  </div>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `flex` | Horizontal split layout |
| `hidden lg:flex` | Left panel hidden on mobile, flex at 1024px+ |
| `w-1/2` | Each panel takes 50% width |
| `bg-gradient-to-br from-blue-600 to-purple-700` | Diagonal blue-to-purple gradient |
| `items-center justify-center` | Centers content in left panel |
| `p-12` | 3rem panel padding |
| `max-w-lg` | Constrains text to 32rem |
| `text-white` | White text on gradient |
| `text-4xl font-bold` | Large bold heading |
| `mb-6` | 1.5rem margin below heading |
| `text-lg text-blue-100` | Light blue paragraph text |
| `mb-8` | 2rem margin below paragraph |
| `space-y-4` | 1rem gap between benefit items |
| `w-8 h-8` | 2rem checkmark container |
| `bg-white/20` | Semi-transparent white background |
| `rounded-full` | Circular checkmark containers |
| `w-full lg:w-1/2` | Full width mobile, 50% desktop |
| `p-8` | 2rem right panel padding |
| `grid grid-cols-2 gap-4` | 2-column name fields with 1rem gap |
| `h-4 w-4` | Small checkbox |
| `text-blue-600` | Blue checkbox and links |
| `ml-2` | Gap between checkbox and label |
| `font-medium` | Medium weight link text |

---

## 12. Tables & Data Display

### 12.1 Data Table with Sorting

```html
<div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
  <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
    <h3 class="font-semibold text-gray-900">Recent Orders</h3>
    <button class="text-blue-600 text-sm font-medium hover:text-blue-700">View all</button>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-001</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">John Smith</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$250.00</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-15</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-002</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Sarah Johnson</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$125.50</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-14</td>
        </tr>
        <tr class="hover:bg-gray-50 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-003</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Mike Brown</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Cancelled</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$75.00</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2026-01-13</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `rounded-xl` | 0.75rem outer rounding |
| `shadow-sm` | Small shadow |
| `border border-gray-200` | Light outer border |
| `overflow-hidden` | Clips content to rounded corners |
| `px-6 py-4` | Header padding |
| `border-b border-gray-200` | Bottom border on header |
| `flex items-center justify-between` | Pushes title left, button right |
| `overflow-x-auto` | Horizontal scroll on small screens |
| `w-full` | Full width table |
| `bg-gray-50` | Light gray header background |
| `px-6 py-3` | Header cell padding |
| `text-left` | Left-aligned header text |
| `text-xs font-medium` | Small medium weight header |
| `text-gray-500` | Muted gray header text |
| `uppercase` | Uppercase header text |
| `tracking-wider` | Increased letter spacing |
| `divide-y divide-gray-200` | Horizontal borders between rows |
| `hover:bg-gray-50` | Light gray row hover |
| `transition-colors` | Smooth row hover transition |
| `whitespace-nowrap` | Prevents text wrapping |
| `text-sm font-medium` | Small medium weight ID |
| `text-gray-900` | Dark text for IDs |
| `text-gray-600` | Medium gray for customer names |
| `px-2 py-1` | Small status badge padding |
| `text-xs font-medium` | Small medium weight badge |
| `bg-green-100 text-green-800` | Green completed badge |
| `bg-yellow-100 text-yellow-800` | Yellow pending badge |
| `bg-red-100 text-red-800` | Red cancelled badge |
| `rounded-full` | Pill status badges |
| `text-gray-500` | Muted date text |

---

### 12.2 Responsive Table with Cards

```html
<div class="space-y-4">
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
    <div class="flex items-center gap-4 flex-1">
      <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
      </div>
      <div>
        <h3 class="font-semibold text-gray-900">Order #ORD-001</h3>
        <p class="text-sm text-gray-500">John Smith - 2026-01-15</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <span class="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
      <span class="font-bold text-gray-900">$250.00</span>
    </div>
  </div>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
    <div class="flex items-center gap-4 flex-1">
      <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <div>
        <h3 class="font-semibold text-gray-900">Order #ORD-002</h3>
        <p class="text-sm text-gray-500">Sarah Johnson - 2026-01-14</p>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <span class="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
      <span class="font-bold text-gray-900">$125.50</span>
    </div>
  </div>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `space-y-4` | 1rem vertical gap between cards |
| `flex flex-col sm:flex-row` | Stack on mobile, horizontal at 640px+ |
| `sm:items-center` | Vertically centers at 640px+ |
| `gap-4` | 1rem gap between elements |
| `flex items-center gap-4` | Horizontal icon and text with gap |
| `flex-1` | Takes remaining space |
| `w-12 h-12` | 3rem icon container |
| `bg-blue-100` / `bg-yellow-100` | Color-coded icon backgrounds |
| `rounded-lg` | 0.5rem icon rounding |
| `font-semibold` | Bold order ID |
| `text-sm text-gray-500` | Small gray metadata |
| `px-3 py-1` | Status badge padding |
| `text-sm font-medium` | Small medium badge text |
| `bg-green-100 text-green-800` | Green completed |
| `bg-yellow-100 text-yellow-800` | Yellow pending |
| `rounded-full` | Pill badges |
| `font-bold` | Bold price |

---

## 13. Modals & Overlays

### 13.1 Confirmation Modal

```html
<div class="fixed inset-0 z-50 flex items-center justify-center p-4">
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  <div class="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
    <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
      </svg>
    </div>
    <h3 class="text-lg font-bold text-gray-900 text-center mb-2">Delete Account</h3>
    <p class="text-gray-600 text-center mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
    <div class="flex gap-3">
      <button class="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">Cancel</button>
      <button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors">Delete</button>
    </div>
  </div>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `fixed inset-0` | Covers entire viewport |
| `z-50` | High z-index above all content |
| `flex items-center justify-center` | Centers modal vertically and horizontally |
| `p-4` | Padding around modal (prevents edge touching) |
| `absolute inset-0` | Backdrop covers full screen |
| `bg-black/50` | Semi-transparent black backdrop |
| `backdrop-blur-sm` | Small blur effect behind modal |
| `relative` | Modal above backdrop |
| `bg-white` | White modal background |
| `rounded-2xl` | 1rem modal rounding |
| `shadow-xl` | Extra large modal shadow |
| `max-w-md` | Constrains modal to 28rem (448px) |
| `w-full` | Full width on small screens |
| `p-6` | 1.5rem modal padding |
| `w-12 h-12` | 3rem warning icon container |
| `bg-red-100` | Light red warning background |
| `rounded-full` | Circular warning icon |
| `mx-auto mb-4` | Centers icon and adds bottom margin |
| `text-lg font-bold` | Large bold modal title |
| `text-center` | Centers title and text |
| `mb-2` | 0.5rem margin below title |
| `text-gray-600` | Gray description text |
| `mb-6` | 1.5rem margin below description |
| `flex gap-3` | Horizontal buttons with 0.75rem gap |
| `flex-1` | Equal width buttons |
| `px-4 py-2` | Button padding |
| `border border-gray-300` | Gray cancel button border |
| `rounded-lg` | 0.5rem button rounding |
| `text-gray-700` | Dark gray cancel text |
| `hover:bg-gray-50` | Light gray cancel hover |
| `bg-red-600 text-white` | Red delete button |
| `hover:bg-red-700` | Darker red on hover |

---

### 13.2 Slide-Over Panel

```html
<div class="fixed inset-0 z-50 overflow-hidden">
  <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
  <div class="absolute inset-y-0 right-0 max-w-lg w-full bg-white shadow-xl transform translate-x-0 transition-transform">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">Panel Title</h2>
      <button class="text-gray-400 hover:text-gray-600 transition-colors">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="p-6">
      <p class="text-gray-600">Panel content goes here...</p>
    </div>
  </div>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `fixed inset-0` | Covers full viewport |
| `z-50` | Above all content |
| `overflow-hidden` | Prevents body scroll |
| `absolute inset-0` | Full screen backdrop |
| `bg-black/50` | Semi-transparent black |
| `backdrop-blur-sm` | Small blur effect |
| `absolute inset-y-0 right-0` | Fixed to right edge, full height |
| `max-w-lg` | Constrains to 32rem (512px) |
| `w-full` | Full width on small screens |
| `bg-white` | White panel background |
| `shadow-xl` | Extra large shadow |
| `transform translate-x-0` | Visible position (use translate-x-full for hidden) |
| `transition-transform` | Smooth slide animation |
| `px-6 py-4` | Header padding |
| `border-b border-gray-200` | Bottom header border |
| `flex items-center justify-between` | Title left, close right |
| `text-gray-400 hover:text-gray-600` | Gray to dark gray close button |
| `w-6 h-6` | 1.5rem close icon |
| `p-6` | 1.5rem content padding |

---

## 14. Notifications & Alerts

### 14.1 Success Alert

```html
<div class="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
  <div class="flex-shrink-0">
    <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  </div>
  <div class="flex-1">
    <h3 class="text-sm font-medium text-green-800">Success!</h3>
    <p class="text-sm text-green-700 mt-1">Your changes have been saved successfully.</p>
  </div>
  <button class="flex-shrink-0 text-green-500 hover:text-green-700 transition-colors">
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
  </button>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `bg-green-50` | Very light green background (#f0fdf4) |
| `border border-green-200` | Light green border |
| `rounded-lg` | 0.5rem alert rounding |
| `p-4` | 1rem alert padding |
| `flex items-start gap-3` | Horizontal layout with 0.75rem gap |
| `flex-shrink-0` | Prevents icon from shrinking |
| `w-5 h-5` | 1.25rem icon size |
| `text-green-600` | Green icon color |
| `flex-1` | Text takes remaining space |
| `text-sm font-medium` | Small medium weight title |
| `text-green-800` | Dark green title |
| `text-green-700` | Medium green description |
| `mt-1` | Small margin below title |
| `text-green-500 hover:text-green-700` | Green close button |
| `transition-colors` | Smooth close button hover |

---

### 14.2 Toast Notification

```html
<div class="fixed bottom-4 right-4 z-50">
  <div class="bg-gray-900 text-white rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-[300px]">
    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
      <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
    </div>
    <div class="flex-1">
      <p class="font-medium text-sm">Changes saved</p>
      <p class="text-gray-400 text-xs">Your settings have been updated.</p>
    </div>
    <button class="text-gray-400 hover:text-white transition-colors">
      <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `fixed bottom-4 right-4` | Fixed to bottom-right corner |
| `z-50` | Above all content |
| `bg-gray-900 text-white` | Dark background with white text |
| `rounded-lg` | 0.5rem toast rounding |
| `shadow-lg` | Large shadow for elevation |
| `p-4` | 1rem toast padding |
| `flex items-center gap-3` | Horizontal layout with 0.75rem gap |
| `min-w-[300px]` | Minimum width 300px (arbitrary value) |
| `w-8 h-8` | 2rem status icon container |
| `bg-green-500` | Green success background |
| `rounded-full` | Circular icon container |
| `flex-shrink-0` | Prevents icon from shrinking |
| `w-4 h-4` | 1rem checkmark icon |
| `text-white` | White checkmark |
| `flex-1` | Text takes remaining space |
| `font-medium text-sm` | Small medium weight title |
| `text-gray-400 text-xs` | Extra small gray subtitle |
| `text-gray-400 hover:text-white` | Gray to white close button |
| `transition-colors` | Smooth close button hover |

---

### 14.3 Banner Alert

```html
<div class="bg-blue-600 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <svg class="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <p class="text-sm font-medium">New features available! Check out our latest update.</p>
    </div>
    <div class="flex items-center gap-4">
      <a href="#" class="text-sm font-medium underline hover:text-blue-100 transition-colors">Learn more</a>
      <button class="text-white/80 hover:text-white transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  </div>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `bg-blue-600 text-white` | Blue banner with white text |
| `max-w-7xl mx-auto` | Centers content, max 1280px |
| `px-4 sm:px-6 lg:px-8` | Responsive horizontal padding |
| `py-3` | 0.75rem vertical padding |
| `flex items-center justify-between` | Pushes content left, actions right |
| `flex items-center gap-3` | Icon and text with 0.75rem gap |
| `w-5 h-5` | 1.25rem info icon |
| `flex-shrink-0` | Prevents icon from shrinking |
| `text-sm font-medium` | Small medium weight text |
| `underline` | Underlined link |
| `hover:text-blue-100` | Light blue link hover |
| `text-white/80` | Slightly transparent close button |
| `hover:text-white` | Full white on hover |
| `transition-colors` | Smooth hover transitions |

---

## 15. Sidebar Layouts

### 15.1 Collapsible Sidebar

```html
<div class="flex h-screen bg-gray-50">
  <aside class="w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300" id="sidebar">
    <div class="h-16 flex items-center px-6 border-b border-gray-200">
      <span class="text-xl font-bold text-gray-900">Logo</span>
    </div>
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <a href="#" class="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
        Dashboard
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        Analytics
      </a>
      <a href="#" class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
        Users
      </a>
    </nav>
    <div class="p-4 border-t border-gray-200">
      <button class="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors w-full">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        Logout
      </button>
    </div>
  </aside>
  <main class="flex-1 overflow-y-auto">
    <header class="h-16 bg-white border-b border-gray-200 flex items-center px-8">
      <button class="p-2 text-gray-500 hover:text-gray-700 mr-4" onclick="document.getElementById('sidebar').classList.toggle('w-64');document.getElementById('sidebar').classList.toggle('w-0');">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
    </header>
    <div class="p-8">
      <p class="text-gray-600">Main content area...</p>
    </div>
  </main>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `flex h-screen` | Horizontal flex, full viewport height |
| `bg-gray-50` | Light gray main background |
| `w-64` | Sidebar width 16rem (256px) |
| `bg-white` | White sidebar background |
| `border-r border-gray-200` | Right border separation |
| `flex flex-col` | Vertical flex for sidebar content |
| `transition-all duration-300` | 300ms smooth width transition |
| `h-16` | 4rem header height |
| `px-6` | 1.5rem horizontal header padding |
| `border-b border-gray-200` | Bottom header border |
| `flex items-center` | Vertically centers header content |
| `flex-1` | Nav takes remaining vertical space |
| `p-4` | 1rem nav padding |
| `space-y-1` | 0.25rem gap between nav items |
| `overflow-y-auto` | Scrollable nav if needed |
| `bg-blue-50 text-blue-700` | Active nav item styling |
| `hover:bg-gray-50` | Hover state for nav items |
| `rounded-lg` | 0.5rem nav item rounding |
| `font-medium` | Medium weight nav text |
| `transition-colors` | Smooth color transition |
| `p-4 border-t border-gray-200` | Footer padding and top border |
| `w-full` | Full width logout button |
| `flex-1` | Main content takes remaining space |
| `overflow-y-auto` | Scrollable main content |
| `p-2` | Hamburger button padding |
| `text-gray-500 hover:text-gray-700` | Gray to dark gray hamburger |
| `mr-4` | Right margin after hamburger |
| `text-xl font-semibold` | Large semibold page title |
| `p-8` | 2rem main content padding |

---

### 15.2 Icon-Only Sidebar

```html
<div class="flex h-screen bg-gray-50">
  <aside class="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4">
    <div class="mb-8">
      <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
        <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
    </div>
    <nav class="flex-1 space-y-2">
      <a href="#" class="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
      </a>
      <a href="#" class="w-10 h-10 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg flex items-center justify-center transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
      </a>
      <a href="#" class="w-10 h-10 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg flex items-center justify-center transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
      </a>
    </nav>
    <div class="mt-auto">
      <a href="#" class="w-10 h-10 text-gray-500 hover:bg-gray-50 hover:text-gray-700 rounded-lg flex items-center justify-center transition-colors">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      </a>
    </div>
  </aside>
  <main class="flex-1 overflow-y-auto p-8">
    <p class="text-gray-600">Main content with icon-only sidebar...</p>
  </main>
</div>
```

**Class Breakdown:**

| Class | What It Does |
|-------|-------------|
| `w-16` | Narrow 4rem (64px) sidebar |
| `flex flex-col items-center` | Vertical centered layout |
| `py-4` | 1rem vertical padding |
| `mb-8` | 2rem margin below logo |
| `w-10 h-10` | 2.5rem logo container |
| `bg-blue-600 rounded-lg` | Blue rounded logo |
| `flex items-center justify-center` | Centers logo icon |
| `space-y-2` | 0.5rem gap between icon buttons |
| `w-10 h-10` | 2.5rem square icon buttons |
| `bg-blue-50 text-blue-600` | Active icon button styling |
| `text-gray-500 hover:bg-gray-50 hover:text-gray-700` | Inactive icon hover states |
| `rounded-lg` | 0.5rem icon button rounding |
| `flex items-center justify-center` | Centers icons |
| `transition-colors` | Smooth color transitions |
| `mt-auto` | Pushes settings icon to bottom |
| `flex-1` | Main content takes remaining space |
| `overflow-y-auto` | Scrollable main content |
| `p-8` | 2rem main content padding |

---

*Document generated with Tailwind CSS v4 compatible classes. All examples are production-ready and responsive.*
