import { contact } from "./site";

/**
 * Legal pages. These describe what this site actually does: a contact form that opens the visitor's own
 * email client, no analytics, no advertising, no tracking cookies. Written under the Kenya Data Protection
 * Act, 2019. Have counsel review before launch and update `updated` whenever the text changes.
 */

export type LegalSection = { id: string; heading: string; paras: string[]; list?: string[] };
export type LegalDoc = {
  slug: "privacy" | "terms";
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  glance: { label: string; value: string }[];
  sections: LegalSection[];
  otherLabel: string;
  otherTo: string;
};

const company = "CTEC Consults Limited";

export const privacy: LegalDoc = {
  slug: "privacy",
  eyebrow: "privacy policy",
  title: "How we handle your information",
  updated: "16 September 2026",
  intro: `This policy explains what ${company} collects when you use this website, why we collect it, how long we keep it, and the rights you have over it. We have kept it short because the site itself is simple: it does not track you, it does not serve advertising, and it does not use analytics.`,
  glance: [
    { label: "Tracking cookies", value: "None" },
    { label: "Analytics", value: "None" },
    { label: "Advertising", value: "None" },
    { label: "Data you send us", value: "Only what you type in an enquiry" },
    { label: "Governing law", value: "Kenya Data Protection Act, 2019" },
    { label: "Contact", value: contact.email },
  ],
  sections: [
    {
      id: "who-we-are",
      heading: "Who we are",
      paras: [
        `${company} is a management and development consultancy based in ${contact.location}. For the purposes of the Data Protection Act, 2019, we are the data controller for any personal information collected through this website.`,
        `You can reach us at ${contact.email} or on ${contact.phone}.`,
      ],
    },
    {
      id: "scope",
      heading: "What this policy covers",
      paras: [
        "This policy applies to this website and to enquiries you send us through it. It does not cover the work we do for clients under a signed engagement, which is governed by the terms of that engagement, or any third-party services you may reach by following a link from this site.",
      ],
    },
    {
      id: "what-we-collect",
      heading: "The information we collect",
      paras: [
        "We collect information in two ways, and only two.",
      ],
      list: [
        "Information you give us. When you use the enquiry form, the form opens a new message in your own email application addressed to us. Nothing is stored on this website. What we receive is the message you choose to send: typically your name, your email address, the organization you represent, and what you wrote.",
        "Technical information. Like almost every website, the servers that deliver these pages may keep standard access logs, which can include the IP address of your device, the pages requested, and the time of the request. We do not add any tracking of our own on top of this.",
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use it",
      paras: [
        "We use the information in an enquiry to reply to you and, if you ask us to, to explore working together. We do not add you to a marketing list, and we do not sell or rent your information to anyone.",
        "Server logs are used only to keep the site running securely and to diagnose problems.",
      ],
    },
    {
      id: "legal-basis",
      heading: "Our lawful basis",
      paras: [
        "When you write to us, we process what you send because you have asked us to respond, which is a legitimate interest we share, and because the steps we take are at your request before any contract is entered into. Server logs are processed on the basis of our legitimate interest in running a secure website.",
      ],
    },
    {
      id: "cookies",
      heading: "Cookies and local storage",
      paras: [
        "This site does not set tracking cookies and does not use analytics or advertising services. Your browser may keep purely technical data needed to display the pages, such as cached files. You can clear these at any time through your browser settings and the site will continue to work.",
      ],
    },
    {
      id: "sharing",
      heading: "Who we share it with",
      paras: [
        "We share information only with the providers we rely on to operate: the company that hosts this website and the provider of our email service. Each acts on our instructions and is bound by its own data protection commitments. We will also disclose information where the law requires it.",
      ],
    },
    {
      id: "transfers",
      heading: "Where your information is stored",
      paras: [
        "Our hosting and email providers may store data on servers outside Kenya. Where that happens, we rely on providers that offer appropriate safeguards for international transfers, as required by the Data Protection Act, 2019.",
      ],
    },
    {
      id: "retention",
      heading: "How long we keep it",
      paras: [
        "We keep enquiry emails for as long as needed to respond and, where a conversation leads to an engagement, for the life of that relationship and any period the law requires afterwards. Enquiries that do not lead anywhere are deleted within twelve months. Server logs are kept by our hosting provider for a short rolling period and then discarded.",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      paras: [
        "Under the Data Protection Act, 2019 you have the right to:",
      ],
      list: [
        "be told what personal information we hold about you and to receive a copy of it,",
        "have inaccurate information corrected,",
        "have your information deleted where there is no good reason for us to keep it,",
        "object to processing, or ask us to restrict it, in certain circumstances,",
        "lodge a complaint with the Office of the Data Protection Commissioner if you believe we have not handled your information properly.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      paras: [
        "This site is served over an encrypted connection. Because the enquiry form uses your own email application, the security of the message in transit depends on your email provider and ours. We take reasonable technical and organizational steps to protect the information we hold, and we limit access to the people who need it to respond to you.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      paras: [
        "This site is intended for organizations and professionals. We do not knowingly collect information from anyone under eighteen. If you believe a child has sent us personal information, please contact us and we will delete it.",
      ],
    },
    {
      id: "links",
      heading: "Links to other services",
      paras: [
        "Some pages link to services we do not run, such as a messaging application for quick contact. Those services have their own privacy policies, and this one does not apply once you leave our site.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      paras: [
        "If we change how the site works in a way that affects your information, we will update this page and change the date at the top. Continued use of the site after a change means you accept the updated policy.",
      ],
    },
    {
      id: "contact",
      heading: "How to contact us",
      paras: [
        `Questions about this policy, or requests to exercise your rights, can be sent to ${contact.email}. We aim to respond within thirty days.`,
      ],
    },
  ],
  otherLabel: "Terms of use",
  otherTo: "/terms",
};

export const terms: LegalDoc = {
  slug: "terms",
  eyebrow: "terms of use",
  title: "The terms that apply to this site",
  updated: "16 September 2026",
  intro: `These terms set out how you may use the ${company} website and what you can and cannot expect from it. They are deliberately plain. They cover the website only; any work we do for a client is governed by a separate written agreement.`,
  glance: [
    { label: "Applies to", value: "Use of this website" },
    { label: "Does not cover", value: "Client engagements" },
    { label: "Content is", value: "General information, not advice" },
    { label: "Governing law", value: "The laws of Kenya" },
    { label: "Operator", value: company },
    { label: "Contact", value: contact.email },
  ],
  sections: [
    {
      id: "agreement",
      heading: "Agreement to these terms",
      paras: [
        "By using this website you agree to these terms. If you do not agree with them, please do not use the site. We may update the terms from time to time, and the date at the top tells you when they last changed.",
      ],
    },
    {
      id: "operator",
      heading: "Who operates the site",
      paras: [
        `This website is operated by ${company}, a management and development consultancy based in ${contact.location}. You can contact us at ${contact.email}.`,
      ],
    },
    {
      id: "use",
      heading: "Using the site",
      paras: [
        "You may browse the site and use the enquiry form to contact us for lawful purposes. You must not:",
      ],
      list: [
        "attempt to gain unauthorized access to the site, its hosting, or any connected system,",
        "introduce malicious code, or use automated tools to scrape or overload the site,",
        "use the enquiry form to send unsolicited advertising or anything unlawful, abusive, or misleading,",
        "copy, reproduce, or republish the site's content except as permitted below.",
      ],
    },
    {
      id: "content",
      heading: "Content and intellectual property",
      paras: [
        `The text, design, images, video, and code on this site belong to ${company} or to the parties who licensed them to us. You may view the site and print or save pages for your own reference. Any other use, including reproducing content in another publication or product, needs our written permission first.`,
        "The CTEC Consults name and mark may not be used without our consent.",
      ],
    },
    {
      id: "no-advice",
      heading: "Information, not advice",
      paras: [
        "Everything on this site is general information about who we are and what we do. It is not professional, legal, financial, or technical advice, and it should not be relied on as such. Advice is something we provide under a signed engagement, based on your particular circumstances.",
        "We work to keep the site accurate and current, but we make no promise that it is complete or free of errors at any given moment.",
      ],
    },
    {
      id: "enquiries",
      heading: "Enquiries",
      paras: [
        "Sending us an enquiry does not create a client relationship, and nothing you send through the site is treated as confidential until an engagement is in place. Please do not include sensitive or confidential material in an initial enquiry.",
        "How we handle the information in an enquiry is described in our privacy policy.",
      ],
    },
    {
      id: "third-parties",
      heading: "Links to other sites and services",
      paras: [
        "Where the site links to services or websites we do not control, we provide the link for convenience only. We are not responsible for their content, availability, or how they handle your information.",
      ],
    },
    {
      id: "availability",
      heading: "Availability",
      paras: [
        "We may change, suspend, or withdraw any part of the site at any time without notice. We do not guarantee that the site will always be available or free of interruption.",
      ],
    },
    {
      id: "liability",
      heading: "Limitation of liability",
      paras: [
        `To the extent permitted by law, ${company} is not liable for any loss or damage arising from your use of, or inability to use, this site or its content, including any loss arising from reliance on information published here. Nothing in these terms excludes liability that cannot be excluded under the laws of Kenya.`,
      ],
    },
    {
      id: "law",
      heading: "Governing law",
      paras: [
        "These terms are governed by the laws of Kenya. Any dispute arising from them or from your use of the site is subject to the exclusive jurisdiction of the courts of Kenya.",
      ],
    },
    {
      id: "changes",
      heading: "Changes to these terms",
      paras: [
        "We may revise these terms by updating this page. Continued use of the site after a revision means you accept the revised terms.",
      ],
    },
    {
      id: "contact",
      heading: "How to contact us",
      paras: [
        `Questions about these terms can be sent to ${contact.email}.`,
      ],
    },
  ],
  otherLabel: "Privacy policy",
  otherTo: "/privacy",
};
