import { useEffect, useState } from 'react';

// Preference to instruction mapping
const PREFERENCE_MAP = {
    prefs_focus_style: {
      true: 'When brainstorming or there are many paths forward, hone in on one idea/plan.',
      false: 'When brainstorming or there are many paths forward, provide multiple options.',
    },
    prefs_emojis: {
      true: 'Use emojis when helpful.',
      false: 'Do not use emojis.',
    },
    prefs_formatting: {
      true: 'Use formatting like tables, lists, and markdown to clarify ideas.',
      false: 'Avoid complex formatting unless specifically asked.',
    },
    prefs_bluntness: {
      1: 'Be very considerate; phrase carefully to avoid offense.',
      2: 'Be gentle; prioritize consideration in responses.',
      3: 'Balance being direct with thoughtful consideration.',
      4: 'Be direct and clear, even if bluntness is required.',
      5: 'Be fully direct; clarity matters more than comfort.',
    },
    prefs_assertiveness: {
      1: 'Fully support *NAME*, don\'t challenge their views.',
      2: 'Generally support *NAME*, unless obviously incorrect.',
      3: 'Mostly side with *NAME*, but gently challenge serious errors.',
      4: 'Regularly push back when needed; hold *NAME* accountable.',
      5: 'Firmly stand your ground; respectfully challenge when necessary.',
    },
    prefs_empathy: {
      1: 'Maintain strictly professional tone; avoid empathy entirely.',
      2: 'Prefer professionalism; minimal empathy unless crucial.',
      3: 'Provide empathy selectively, when clearly beneficial.',
      4: 'Actively include empathy in responses when relevant.',
      5: 'Consistently offer empathetic support throughout conversations.',
    },
    prefs_length: {
      1: 'Extremely concise; use as few words as possible.',
      2: 'Favor concise responses; remove unnecessary details.',
      3: 'Adjust length to match complexity of context or request.',
      4: 'Often elaborate; explain clearly and provide detailed answers.',
      5: 'Always detailed; fully elaborate and thoroughly explain ideas.',
    },
    prefs_creativity: {
      1: 'Stick to straightforward, traditional responses only.',
      2: 'Mostly conventional responses; use creativity sparingly.',
      3: 'Adapt creativity based on context; balance traditional and novel.',
      4: 'Be frequently creative, engaging, and lively in tone.',
      5: 'Consistently express an energetic, creative, and vibrant personality.',
    },
    prefs_leadership: {
      1: 'Strictly follow *NAME*\'s lead; wait for explicit instructions.',
      2: 'Mostly follow; only suggest when instructions are unclear.',
      3: 'Flexibly shift roles based on context; lead or follow as needed.',
      4: 'Regularly lead; proactively suggest next steps or ideas.',
      5: 'Always lead actively; steer conversations forward proactively.',
    },
    prefs_rigidity: {
      1: 'Feel free to deviate entirely from preferences if it improves responses.',
      2: 'Occasionally deviate from preferences to enhance interactions.',
      3: 'Flexibly apply preferences; prioritize conversational quality.',
      4: 'Usually stick closely to provided preferences.',
      5: 'Always strictly follow provided preferences without deviation.',
    }
  };
  

export function useGenerateCustomInstructions() {
  const [traits, setTraits] = useState('');
  const [about, setAbout] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('onboarding_name') || '';
    const traitWords = localStorage.getItem('onboarding_traits') || '';
    const grade = parseInt(localStorage.getItem('onboarding_grade') || '8');
    const school = localStorage.getItem('onboarding_school') || '';
    const studyFocus = localStorage.getItem('onboarding_study') || '';
    const avoid = localStorage.getItem('onboarding_avoid') || '';

    const injectName = (text) => text.replace(/\*NAME\*/g, name);

    const classes = JSON.parse(localStorage.getItem('onboarding_classes') || '[]');
    const activities = JSON.parse(localStorage.getItem('onboarding_activities') || '[]').filter(a => a.confirmed).map(a => a.text);
    const interests = JSON.parse(localStorage.getItem('onboarding_interests') || '[]').filter(i => i.confirmed).map(i => i.text);
    const personalityNote = localStorage.getItem('onboarding_personality_note') || '';

    const prefs = {
      generalHelpfulness: JSON.parse(localStorage.getItem('prefs_general_helpfulness') || 'false'),
      focusStyle: JSON.parse(localStorage.getItem('prefs_focus_style') || 'false'),
      emojis: JSON.parse(localStorage.getItem('prefs_emojis') || 'false'),
      formatting: JSON.parse(localStorage.getItem('prefs_formatting') || 'false'),
      bluntness: parseInt(localStorage.getItem('prefs_bluntness') || '3'),
      assertiveness: parseInt(localStorage.getItem('prefs_assertiveness') || '3'),
      empathy: parseInt(localStorage.getItem('prefs_empathy') || '3'),
      length: parseInt(localStorage.getItem('prefs_length') || '3'),
      creativity: parseInt(localStorage.getItem('prefs_creativity') || '3'),
      leadership: parseInt(localStorage.getItem('prefs_leadership') || '3'),
      rigidity: parseInt(localStorage.getItem('prefs_rigidity') || '3'),
    };

    // TRAITS SECTION
    const generalIntro = prefs.generalHelpfulness
        ? injectName(`ChatGPT should act as an intelligent partner to *NAME*, adapting dynamically and pushing *NAME* towards clarity, insight, and growth. Be humble, straightforward, and aware of limitations. Clarify briefly if unsure, but always respect *NAME*'s intelligence and time. Naturally break everything down to smaller pieces and have more back &forth conversations that flow.`)
        : `ChatGPT should act as a partner focused on directly assisting ${name}. Stay adaptable and clear, adjusting as needed.`;

    const listIntro = `The following preferences define how you should interact with ${name}:`;

    const traitLines = [
        injectName(PREFERENCE_MAP.prefs_focus_style[prefs.focusStyle]),
        injectName(PREFERENCE_MAP.prefs_emojis[prefs.emojis]),
        injectName(PREFERENCE_MAP.prefs_formatting[prefs.formatting]),
        injectName(PREFERENCE_MAP.prefs_bluntness[prefs.bluntness]),
        injectName(PREFERENCE_MAP.prefs_assertiveness[prefs.assertiveness]),
        injectName(PREFERENCE_MAP.prefs_empathy[prefs.empathy]),
        injectName(PREFERENCE_MAP.prefs_length[prefs.length]),
        injectName(PREFERENCE_MAP.prefs_creativity[prefs.creativity]),
        injectName(PREFERENCE_MAP.prefs_leadership[prefs.leadership]),
        injectName(PREFERENCE_MAP.prefs_rigidity[prefs.rigidity]),
    ].map(line => `- ${line}`);
      

    const avoidLine = avoid.trim() ? `- Avoid the following: ${avoid.trim()}` : '';


    const finalNudge = 'Across all interactions, prioritize coherence and natural flow. Stay context-aware and subtly reinforce ' + name + '\'s growth. Always aim for thoughtful depth and clarity without overwhelming—your goal is impactful collaboration.';

    const traitsString = [
      generalIntro,
      '\n',
      listIntro,
      ...traitLines,
      avoidLine,
      '\n',
      finalNudge,
    ].filter(Boolean).join('\n');

    // ABOUT SECTION
    const gradeText = grade >= 17 ? 'Graduate Student' :
                      grade >= 13 ? `College ${['Freshman','Sophomore','Junior','Senior'][grade - 13]}` :
                      grade >= 9 ? `High School ${['Freshman','Sophomore','Junior','Senior'][grade - 9]}` :
                      `${grade}th Grade`;

    const introLine = `${name} shared these details so you can personalize interactions naturally.`;

    const personalInfo = [
    `GRADE: ${gradeText}`,
    `SCHOOL: ${school}${grade >= 13 && studyFocus ? ` — Studying ${studyFocus}` : ''}`,
    ];

    if (traitWords) personalInfo.push(`DESCRIBED AS: ${traitWords}`);

    const classLines = [];
    if (classes.length > 0) {
    classLines.push(`\nCLASSES: (Use these if ${name} asks subject-specific questions)`);
    classes.forEach((cls, i) => {
        classLines.push(`${i + 1}. ${cls.title}${cls.courseNumber ? ` (${cls.courseNumber})` : ''}: ${cls.description}`);
    });
    }

    const activityLines = [];
    if (activities.length > 0) {
    activityLines.push(`\nACTIVITIES: (Mention if relevant to conversation)`, ...activities.map(a => `- ${a}`));
    }

    const interestLines = [];
    if (interests.length > 0) {
    interestLines.push(`\nINTERESTS: (Connect back to these naturally)`, ...interests.map(i => `- ${i}`));
    }

    const personalityLine = personalityNote.trim()
  ? `\nNOTE: ${personalityNote.trim()}`
  : '';

    const outroLine = `\nUse this information to enhance personalization. Interact naturally and authentically—like a friend who genuinely knows them—with humility and real connection.`;

    const aboutString = [
    introLine,
    '',
    ...personalInfo,
    ...classLines,
    ...activityLines,
    ...interestLines,
    personalityLine,
    outroLine,
    ].filter(Boolean).join('\n');


    setTraits(traitsString.replace(/"/g, ''));
    setAbout(aboutString.replace(/"/g, ''));

  }, []);

  return { traits, about };
}

