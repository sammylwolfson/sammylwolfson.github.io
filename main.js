// Theme selection and dynamic loading
(async function() {
  const availableThemes = ['bulky', 'kubrik', 'bright', 'dark', 'minimal'];
  const params = new URLSearchParams(window.location.search);
  let theme = params.get('theme');
  
  // If no theme in URL, try to get it from config.json
  if (!theme) {
    try {
      const response = await fetch('config.json');
      const config = await response.json();
      theme = config.theme;
    } catch (error) {
      console.error('Error loading config.json:', error);
    }
  }
  
  // Normalize and validate
  if (!theme || !availableThemes.includes(theme)) {
    theme = 'minimal'; // Fallback to minimal if config.json fails or theme is invalid
  }
  
  // Create and append the theme link immediately
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `styles/${theme}.css`;
  link.id = 'theme-css';
  document.head.appendChild(link);

  // Preload other themes in the background
  availableThemes.forEach(otherTheme => {
    if (otherTheme !== theme) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.href = `styles/${otherTheme}.css`;
      preloadLink.as = 'style';
      document.head.appendChild(preloadLink);
    }
  });
})();

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('config.json');
    const config = await response.json();
    const profileImage = document.getElementById('gravatar-image');
    if (config.profile && config.profile.gravatarEmail) {
      const cleanEmail = config.profile.gravatarEmail.trim().toLowerCase();
      const gravatarHash = CryptoJS.SHA256(cleanEmail);
      profileImage.src = `https://www.gravatar.com/avatar/${gravatarHash}?s=200`;
      if (config.gravatarHovercard) {
        profileImage.classList.add('hovercard');
        // Dynamically load the hovercards script and initialize
        const script = document.createElement('script');
        script.src = 'https://www.gravatar.com/js/hovercards/hovercards.min.js';
        script.onload = function() {
          if (window.Gravatar && typeof Gravatar.init === 'function') {
            Gravatar.init();
          }
        };
        document.head.appendChild(script);
      } else {
        profileImage.classList.remove('hovercard');
      }
    }
  } catch (error) {
    console.error('Error setting Gravatar image:', error);
  }
});

// Load and apply configuration
async function initializeContent() {
  try {
    const response = await fetch('config.json');
    const config = await response.json();

    // Set page title
    document.title = config.profile.name;

    // Set meta description dynamically
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.profile.tagline || config.profile.bio || '');
    }

    // Set profile information
    document.getElementById('profile-name').textContent = config.profile.name;
    document.getElementById('profile-tagline').textContent = config.profile.tagline;
    document.getElementById('bio-text').textContent = config.profile.bio;

    // Generate social icons
    const socialIcons = document.querySelector('.social-icons');
    const socialIconMap = {
      x: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
      linkedin: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
      email: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>`,
      wordpress: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.109m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.607-3.582.607M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.212 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0"/></svg>`,
      github: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
      bluesky: `<svg class="social-icon" viewBox="0 0 64 57" fill="currentColor" aria-hidden="true" focusable="false"><path d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"/></svg>`,
      discord: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9460 2.4189-2.1568 2.4189Z"/></svg>`,
      facebook: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M22.75,12.0398924c0-5.9376954-4.8123049-10.75-10.75-10.75S1.25,6.1021971,1.25,12.0398924c0,5.0390625,3.4727538,9.2718745,8.1548827,10.4350586v-7.151269h-2.2171876v-3.2837896h2.2171876v-1.4151366c0-3.6575191,1.6544926-5.3540039,5.2490241-5.3540039.680274,0,1.8560552.1343749,2.3389654.2687501v2.9730467c-.2519531-.0251956-.6928711-.0419922-1.242969-.0419922-1.7636719,0-2.4439458.6676755-2.4439458,2.401953v1.1673829h3.5105471l-.6046872,3.2837896h-2.9100594v7.3864255c5.3246089-.6424812,9.4482422-5.173438,9.4482422-10.6702151h0Z"></path></svg>`,
      instagram: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.0023982,6.4889015c-3.0505301,0-5.5110987,2.460569-5.5110987,5.5110983s2.4605686,5.5110983,5.5110987,5.5110983,5.5110983-2.4605683,5.5110983-5.5110983-2.4605683-5.5110983-5.5110983-5.5110983ZM12.0023982,15.582934c-1.9713332,0-3.5829334-1.6068042-3.5829334-3.5829334s1.6068042-3.5829334,3.5829334-3.5829334,3.5829327,1.6068042,3.5829327,3.5829334-1.6116009,3.5829334-3.5829334,3.5829334h.0000007ZM19.0243721,6.2634694c0,.7146679-.5755717,1.2854435-1.2854428,1.2854435-.7146679,0-1.2854428-.5755717-1.2854428-1.2854435s.5755717-1.2854435,1.2854428-1.2854435,1.2854428.5755717,1.2854428,1.2854435ZM22.674456,7.5680983c-.0815399-1.7219186-.4748463-3.2471833-1.7363084-4.5038483-1.2566654-1.2566648-2.7819297-1.6499722-4.5038479-1.7363079-1.7746793-.1007251-7.0939204-.1007251-8.8685997,0-1.7171223.0815394-3.2423869.4748465-4.5038483,1.7315115s-1.6499722,2.7819297-1.7363079,4.5038479c-.100725,1.7746793-.100725,7.0939204,0,8.8685997.0815393,1.7219183.4748466,3.247184,1.7363079,4.5038479,1.2614614,1.2566639,2.7819297,1.6499718,4.5038483,1.7363084,1.7746793.1007253,7.0939204.1007253,8.8685997,0,1.7219183-.0815399,3.247184-.4748463,4.5038479-1.7363084,1.2566654-1.2566654,1.6499718-2.7819297,1.7363084-4.5038479.1007253-1.7746793.1007253-7.0891244,0-8.8638037v.0000007ZM20.3817613,18.3360848c-.374121.9401007-1.0983823,1.664362-2.0432797,2.0432797-1.414947.561183-4.7724483.4316787-6.336085.4316787s-4.925934.1247075-6.336085-.4316787c-.9401003-.374121-1.6643614-1.0983823-2.0432793-2.0432797-.5611824-1.414947-.4316787-4.7724483-.4316787-6.336085s-.1247071-4.925934.4316787-6.336085c.3741215-.9401003,1.0983827-1.6643612,2.0432793-2.0432793,1.414947-.5611822,4.7724483-.4316787,6.336085-.4316787s4.9259347-.1247071,6.336085.4316787c.9401007.3741217,1.664362,1.0983827,2.0432797,2.0432793.561183,1.414947.4316787,4.7724483.4316787,6.336085s.1295042,4.9259332-.4316787,6.336085Z"></path></svg>`,
      spotify: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.84-.179-.959-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.361 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.32 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
      tiktok: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`,
      youtube: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.108-2.117C19.228 3.5 12 3.5 12 3.5s-7.228 0-9.39.569A2.994 2.994 0 0 0 .502 6.186C0 8.35 0 12 0 12s0 3.65.502 5.814a2.994 2.994 0 0 0 2.108 2.117C4.772 20.5 12 20.5 12 20.5s7.228 0 9.39-.569a2.994 2.994 0 0 0 2.108-2.117C24 15.65 24 12 24 12s0-3.65-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
      default: `<svg class="social-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21.2424919,12.4162328c2.0100108-2.0100108,2.0100108-5.265161,0-7.2751718-1.7787706-1.7787706-4.5821127-2.0100108-6.6276989-.5478614l-.0569209.0391329c-.5122857.3664267-.6296852,1.0779351-.2632578,1.5866633s1.0779346.629685,1.5866636.2632581l.0569209-.0391329c1.141971-.814677,2.7037313-.6866053,3.6927274.3059485,1.1206255,1.1206255,1.1206255,2.9349715,0,4.055597l-3.9915617,3.9986756c-1.1206255,1.1206255-2.9349715,1.1206255-4.055597,0-.9925538-.9925538-1.1206255-2.5543142-.3059488-3.6927279l.0391332-.0569209c.3664263-.5122857.2454701-1.2237945-.2632578-1.5866631s-1.223794-.2454701-1.5866636.2632578l-.0391332.0569209c-1.4657063,2.042029-1.2344662,4.8453716.5443045,6.6241422,2.0100108,2.0100108,5.265161,2.0100108,7.2751718,0l3.9951184-3.9951184ZM2.7575081,11.5837678c-2.0100108,2.0100103-2.0100108,5.2651605,0,7.2751713,1.7787705,1.7787706,4.5821131,2.0100108,6.6276993.5478611l.0569209-.0391332c.5122857-.3664263.6296852-1.0779346.2632578-1.5866636s-1.0779351-.6296852-1.5866636-.2632578l-.0569209.0391332c-1.141971.8146767-2.7037313.686605-3.6927279-.3059488-1.1206249-1.1241822-1.1206249-2.9385282.0000005-4.0591537l3.9915612-3.9951189c1.1206255-1.1206255,2.9349721-1.1206255,4.0555976,0,.9925538.9925538,1.1206255,2.5543147.3059488,3.6962857l-.0391332.0569209c-.3664263.5122857-.2454701,1.223794.2632578,1.5866636s1.223794.2454701,1.5866636-.2632578l.0391332-.0569209c1.4657063-2.0455873,1.2344662-4.8489294-.5443045-6.6277-2.0100108-2.0100108-5.265161-2.0100108-7.2751718,0l-3.9951188,3.9951189Z"></path></svg>`
    };

    Object.entries(config.social).forEach(([platform, url]) => {
      if (url) {
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.ariaLabel = `Visit ${platform} profile`;
        a.innerHTML = socialIconMap[platform] || socialIconMap.default;
        socialIcons.appendChild(a);
      }
    });

    // Generate link buttons, but skip the Contact Me link if it matches config.contact.url
    const linksGrid = document.querySelector('.links-grid');
    config.links.forEach(link => {
      // Skip if this link is the contact link
      if (config.contact && link.url === config.contact.url) return;
      const a = document.createElement('a');
      a.href = link.url;
      a.className = 'link-button';
      a.textContent = link.title;
      a.ariaLabel = `Visit ${link.title}`;
      linksGrid.appendChild(a);
    });

    // Set support button
    const supportBtn = document.getElementById('support-button');
    supportBtn.href = config.support.url;
    supportBtn.textContent = config.support.buttonText;
    supportBtn.ariaLabel = config.support.buttonText;

    // Set contact button (footer) using config.contact only
    const contactBtn = document.getElementById('contact-button');
    if (config.contact && config.contact.url && config.contact.buttonText) {
      contactBtn.href = config.contact.url;
      contactBtn.textContent = config.contact.buttonText;
      contactBtn.ariaLabel = config.contact.buttonText;
      contactBtn.style.display = '';
    } else {
      contactBtn.style.display = 'none';
    }

    // Load blog post
    if (config.blog.rssFeed) {
      fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(config.blog.rssFeed)}`)
        .then(response => response.json())
        .then(data => {
          const post = data.items[0];
          document.querySelector('.post-content').innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description.split(' ').slice(0, config.blog.wordCount).join(' ')}...</p>
            <a href="${post.link}" class="read-more" aria-label="Read more about ${post.title}">Read More →</a>
          `;
        })
        .catch(error => {
          console.error('Error fetching blog post:', error);
          document.querySelector('.post-content').innerHTML = `
            <p>Visit my blog at <a href="${config.blog.rssFeed.split('/feed')[0]}" aria-label="Visit Marco Almeida's blog">blog.wonderm00n.com</a></p>
          `;
        });
    } else {
      console.error('Blog RSS feed not provided in config.json');
      document.querySelector('.blog-section').remove();
    }

  } catch (error) {
    console.error('Error loading configuration:', error);
  }
}

// Initialize the page
initializeContent();
