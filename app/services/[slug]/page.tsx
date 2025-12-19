import { notFound } from 'next/navigation';
import ServiceClientWrapper from './ServiceClientWrapper';
import {
  BarChart3,
  Users,
  Target,
  Zap,
  Shield,
  UserPlus,
  Briefcase,
  TrendingUp,
  HeartHandshake,
  Phone,
} from 'lucide-react';

const servicesData: Record<string, any> = {
  'organisational-diagnosis': {
    title: 'Organisational Diagnosis',
    subtitle:
      'Stop Guessing. Start Growing. Precision Diagnosis for Peak Organisational Health.',
    description:
      'Is your organisation hitting invisible walls? We deploy a comprehensive suite of diagnostic tools to systematically identify hidden bottlenecks, inefficient workflows, and structural issues.',
    features: [
      'Invisible Bottleneck Analysis',
      'Structural Misalignment Detection',
      'Cultural Inhibitor Assessment',
      'Performance Lever Identification',
    ],
    icon: 'Microscope',
    fullContent: {
      overview:
        "Is your organisation hitting invisible walls? Are teams moving slower than they should, or are your processes creating friction you can't quite name? Ailing performance is rarely about a lack of effort—it's usually about a structural or systemic fault line deep within the operational core.",
      pitch:
        "Our Organisational Diagnosis service is the definitive, data-driven investigation your company needs. We don't just look at the surface; we deploy a comprehensive suite of tools—from deep-dive interviews and culture surveys to process mapping and data analytics—to systematically identify hidden bottlenecks, inefficient workflows, and structural issues that are silently draining resources and frustrating your top talent.",
      approach: [
        {
          title: 'Invisible Bottlenecks',
          description:
            'Pinpointing the exact points in your value chain where work stalls and efficiency is lost.',
        },
        {
          title: 'Structural Misalignments',
          description:
            'Identifying gaps or overlaps in roles and departments that lead to confusion and redundancy.',
        },
        {
          title: 'Cultural Inhibitors',
          description:
            'Assessing how communication, leadership, and existing norms unintentionally impede performance.',
        },
        {
          title: 'Performance Levers',
          description:
            'Highlighting non-obvious areas where targeted intervention will yield the highest return on efficiency.',
        },
      ],
      cta: 'Stop treating symptoms. Let us diagnose the root cause and set you on the path to sustained, high-level operation.',
    },
  },
  'organisational-redesign-development': {
    title: 'Organisational Redesign & Development',
    subtitle:
      'Future-Proof Your Business. From Strategy to Structure: A Seamless Operating Model.',
    description:
      'Your business strategy is magnificent, but is your current structure built to execute it? We optimize structure, roles, and processes for perfect strategic alignment.',
    features: [
      'Optimised Structure Design',
      'Role & Accountability Clarity',
      'Process Streamlining',
      'Scalability & Resilience Planning',
    ],
    icon: 'Blocks',
    fullContent: {
      overview:
        'Your business strategy is a magnificent blueprint for the future. But is your current structure built to execute it? Often, strategy and structure drift apart, leaving even the most ambitious plans vulnerable to implementation failure.',
      pitch:
        "Organisational Redesign & Development is about more than just moving boxes on an organogram—it's a fundamental recalibration of how work gets done. We partner with you to optimise structure, roles, and processes so that your day-to-day operations are perfectly aligned with your strategic business goals.",
      approach: [
        {
          title: 'Optimised Structure',
          description:
            'Developing reporting lines, departmental architecture, and decision-making processes that enhance speed and accountability.',
        },
        {
          title: 'Defined Roles & Accountabilities',
          description:
            'Clarifying who does what, eliminating redundancy, and empowering employees with focused objectives.',
        },
        {
          title: 'Streamlined Processes',
          description:
            'Rethinking core workflows to eliminate waste and accelerate output.',
        },
        {
          title: 'Scalability & Resilience',
          description:
            'Building capacity for your organisation to fluidly adapt and seamlessly integrate future growth.',
        },
      ],
      cta: 'Transform potential into reality. We help you develop and embed the systems needed for sustained superior performance.',
    },
  },
  'strategic-hr-consulting': {
    title: 'Strategic HR Consulting',
    subtitle:
      'Elevate HR from Administration to Strategic Powerhouse. Expert Guidance for Your Future Workforce.',
    description:
      'HR must be a critical, forward-thinking partner driving business value. We transform your HR function into a genuine engine for growth.',
    features: [
      'Workforce Planning',
      'Transformational Change Leadership',
      'Culture & Values Alignment',
      'HR Technology & Analytics',
    ],
    icon: 'Handshake',
    fullContent: {
      overview:
        "In today's complex business landscape, HR can no longer operate in a silo. It must be a critical, forward-thinking partner that drives business value and manages the most crucial asset: your people.",
      pitch:
        'Our Strategic HR Consulting service transforms your Human Resources function into a genuine engine for growth. We move beyond routine compliance and administrative tasks to deliver expert guidance on complex HR strategy, change management, and long-term workforce planning.',
      approach: [
        {
          title: 'Future Workforce Planning',
          description:
            "Identifying the critical skills you'll need tomorrow and developing strategies to acquire or cultivate them today.",
        },
        {
          title: 'Leading Transformational Change',
          description:
            'Guiding your leadership and employees through M&A, restructuring, or digital transformation with minimal disruption.',
        },
        {
          title: 'Culture & Values Alignment',
          description:
            'Designing initiatives that embed your core values into every process, policy, and leader behaviour.',
        },
        {
          title: 'HR Technology & Analytics',
          description:
            'Selecting and implementing systems that provide actionable insights and strategic intelligence.',
        },
      ],
      cta: 'Integrate HR strategy with your overall business objectives to drive sustainable competitive advantage.',
    },
  },
  'compensation-benefits-structuring': {
    title: 'Compensation & Benefits Structuring',
    subtitle:
      'Attract. Motivate. Retain. Designing C&B Packages That Define Your Value Proposition.',
    description:
      'In competition for top talent, your C&B package is your most powerful statement. We design fair, competitive packages strategically aligned with market and financial realities.',
    features: [
      'Market Benchmarking',
      'Total Rewards Strategy',
      'Internal Equity Analysis',
      'Performance Linkage & Incentives',
    ],
    icon: 'Wallet',
    fullContent: {
      overview:
        "A poorly structured compensation and benefits package doesn't just lose you candidates—it actively erodes morale and drives up turnover among your best people.",
      pitch:
        'We specialize in designing fair, competitive Compensation and Benefits (C&B) packages that are strategically aligned with both market realities and your financial objectives. Our process is analytical and forward-looking.',
      approach: [
        {
          title: 'Market Benchmarking',
          description:
            'Using robust, real-time data to ensure your compensation levels are competitive within your industry and region.',
        },
        {
          title: 'Total Rewards Strategy',
          description:
            'Integrating salary, health insurance, retirement plans, wellness programs, and flexible work into a holistic package.',
        },
        {
          title: 'Internal Equity Analysis',
          description:
            'Structuring pay grades to ensure fairness and transparency across all roles.',
        },
        {
          title: 'Performance Linkage',
          description:
            'Designing incentive structures that directly drive employee motivation and retention.',
        },
      ],
      cta: 'Create a Total Rewards strategy that attracts top talent and fosters the commitment needed for long-term success.',
    },
  },
  'recruitment-talent-acquisition': {
    title: 'Recruitment & Talent Acquisition',
    subtitle:
      'Beyond the CV. Strategic Sourcing to Secure the Perfect Culture and Competency Fit.',
    description:
      'Your next hire could be your next breakthrough. In a crowded talent market, we source, screen, and secure the best candidates across all levels.',
    features: [
      'Strategic Sourcing',
      'Robust Screening',
      'Culture Fit Analysis',
      'Candidate Experience Management',
    ],
    icon: 'UserPlus',
    fullContent: {
      overview:
        'Your next hire could be your next breakthrough. But in a crowded talent market, relying on passive job postings is no longer enough. The cost of a bad hire—in terms of productivity loss, team morale, and replacement expense—is astronomical.',
      pitch:
        "Our Recruitment & Talent Acquisition service is a dedicated partnership designed to ensure every hire is a strategic asset. Our team of specialists doesn't just fill vacancies; we source, screen, and secure the best candidates across all levels, from entry-level roles to executive leadership.",
      approach: [
        {
          title: 'Strategic Sourcing',
          description:
            'We utilize advanced headhunting, specialized networks, and targeted digital outreach to find passive, high-quality candidates others miss.',
        },
        {
          title: 'Robust Screening',
          description:
            'We implement multi-layered assessment techniques, including competency-based interviews, technical testing, and psychometric evaluation.',
        },
        {
          title: 'The Perfect Fit',
          description:
            'We obsess over culture fit. A candidate may have the skills, but they must also embody your values and thrive in your environment.',
        },
        {
          title: 'Candidate Experience',
          description:
            'We manage the entire recruitment lifecycle with professionalism and transparency, enhancing your employer brand.',
        },
      ],
      cta: 'Stop sorting through stacks of unsuited applications. Partner with us to secure the talent that will drive your organisation forward.',
    },
  },
  'performance-management': {
    title: 'Performance Management',
    subtitle:
      'From Annual Review to Continuous Growth: Systems That Drive High Performance.',
    description:
      'Performance management should not be a dreaded annual event—it should be a dynamic engine for individual and organisational growth.',
    features: [
      'Goal Setting (OKRs)',
      'Continuous Feedback Loops',
      'Objective Evaluation',
      'Development Planning & Coaching',
    ],
    icon: 'BarChart3',
    fullContent: {
      overview:
        'Traditional, backward-looking appraisal systems often fail to motivate and instead create disconnect between employees and business goals.',
      pitch:
        'We design and implement effective performance management systems that shift the focus from evaluation to continuous development. Our systems foster accountability, clarity, and sustained high achievement across all teams.',
      approach: [
        {
          title: 'Goal Setting (OKRs/SMART)',
          description:
            'Implementing objective systems for clear, measurable, and strategically aligned goals at every level.',
        },
        {
          title: 'Continuous Feedback Loops',
          description:
            'Moving beyond once-a-year talks with easy-to-use platforms for frequent, constructive feedback and coaching.',
        },
        {
          title: 'Objective Evaluation',
          description:
            'Developing fair, transparent, and data-driven methods for employee evaluation.',
        },
        {
          title: 'Development Planning',
          description:
            'Ensuring performance discussions translate into concrete training and career pathing opportunities.',
        },
      ],
      cta: 'Implement systems that foster high performance, boost morale, and ensure every employee understands their impact.',
    },
  },
  'training-development': {
    title: 'Training & Development',
    subtitle:
      'Invest in Your Future. Targeted Learning Programs to Upskill, Empower, and Elevate Your Workforce.',
    description:
      'The pace of business change demands continuous learning. We design targeted, strategic learning interventions that directly address current and future business needs.',
    features: [
      'Needs Assessment',
      'Bespoke Program Design',
      'Modern Delivery Methods',
      'Impact Measurement & ROI',
    ],
    icon: 'GraduationCap',
    fullContent: {
      overview:
        "If your employees aren't growing, your organisation is stagnating. Generic training programs rarely deliver tangible results.",
      pitch:
        "Our Training & Development service specializes in designing and delivering bespoke programs that are engaging, relevant, and measurable. We don't just teach skills; we close competency gaps and boost team productivity.",
      approach: [
        {
          title: 'Needs Assessment',
          description:
            'Thorough analysis to pinpoint the precise skills and knowledge deficits hindering performance.',
        },
        {
          title: 'Bespoke Program Design',
          description:
            'Creating curriculum—from leadership training to technical skill enhancement—perfectly aligned with your culture.',
        },
        {
          title: 'Modern Delivery Methods',
          description:
            'Utilizing blended learning approaches to maximize engagement and knowledge retention.',
        },
        {
          title: 'Impact Measurement',
          description:
            'Establishing clear metrics to track ROI and ensure investment translates to business outcomes.',
        },
      ],
      cta: "Upskill your workforce today to ensure you have the capabilities required for tomorrow's challenges.",
    },
  },
  'career-enhancement': {
    title: 'Career Enhancement',
    subtitle:
      'Retention Through Growth. Empowering Individuals to Achieve Their Highest Potential.',
    description:
      'Top talent looks for a career runway. Investing in individual potential is the most effective way to foster loyalty and long-term commitment.',
    features: [
      'Personalized Coaching',
      'Development Plan Creation',
      'Mentorship Programs',
      'Succession Planning',
    ],
    icon: 'Rocket',
    fullContent: {
      overview:
        "Top talent doesn't just look for a job; they look for a career runway. The perception of limited growth is one of the primary drivers of voluntary turnover.",
      pitch:
        'Our Career Enhancement service provides personalized, structured support that helps employees take ownership of their professional journey. We offer highly effective tools and guidance, turning ambition into concrete action.',
      approach: [
        {
          title: 'Personalized Coaching',
          description:
            'One-on-one sessions with certified coaches to identify strengths, clarify aspirations, and overcome hurdles.',
        },
        {
          title: 'Development Plan Creation',
          description:
            'Helping individuals craft structured, realistic development plans aligned with organisational needs.',
        },
        {
          title: 'Mentorship Programs',
          description:
            'Building effective internal mentorship frameworks that facilitate knowledge transfer and leadership development.',
        },
        {
          title: 'Succession Planning',
          description:
            'Linking individual career paths directly into your succession pipeline.',
        },
      ],
      cta: 'Help individuals achieve their potential, resulting in a more engaged, motivated, and highly retained workforce.',
    },
  },
  'hr-policy-development': {
    title: 'HR Policy Development',
    subtitle:
      'Establish the Blueprint. Comprehensive Policies for a Fair, Compliant, and Predictable Workplace.',
    description:
      'Clear, legally sound HR policies are the backbone of a predictable, fair workplace. We create comprehensive policies that protect both business and people.',
    features: [
      'Legal Compliance',
      'Clarity & Accessibility',
      'Expectation Definition',
      'Best Practice Implementation',
    ],
    icon: 'ClipboardList',
    fullContent: {
      overview:
        'Without clear policies, you expose your organisation to legal risk, inconsistent decision-making, and employee confusion. Policies are not barriers; they are guardrails that protect both business and people.',
      pitch:
        'Our HR Policy Development service focuses on creating comprehensive, legally compliant policies and employee handbooks that serve as the definitive guide for workplace expectations and standards.',
      approach: [
        {
          title: 'Legal Compliance',
          description:
            'Ensuring all policies rigorously adhere to current national and local labor laws and regulations.',
        },
        {
          title: 'Clarity & Accessibility',
          description:
            'Writing policies that are clear, unambiguous, and easily understood by all employees.',
        },
        {
          title: 'Expectation Definition',
          description:
            'Creating handbooks that clearly define expectations, workplace standards, and codes of conduct.',
        },
        {
          title: 'Best Practice Implementation',
          description:
            'Incorporating modern HR best practices for diversity, flexibility, and digital ethics.',
        },
      ],
      cta: 'Provide the foundation for consistent, defensible HR management that allows leaders to manage with confidence and fairness.',
    },
  },
  'employee-relations-compliance': {
    title: 'Employee Relations & Compliance',
    subtitle:
      'Navigate Complexity with Confidence. Expert Management of Workplace Issues and Legal Obligations.',
    description:
      'Mishandling sensitive workplace issues can lead to costly lawsuits and reputational damage. We provide expert guidance for maintaining a productive, fair, and legally sound workplace.',
    features: [
      'Conflict Resolution & Mediation',
      'Disciplinary Management',
      'Labor Law Adherence',
      'Investigation Expertise',
    ],
    icon: 'Scale',
    fullContent: {
      overview:
        'Employee Relations (ER) is where your policies are tested and your culture is truly defined. Mishandling a sensitive issue or falling out of compliance can lead to costly lawsuits and reputational damage.',
      pitch:
        'Our Employee Relations and Compliance service provides the expert guidance and hands-on support necessary to maintain a productive, fair, and legally sound workplace. We are your dedicated partners in maintaining stability and integrity.',
      approach: [
        {
          title: 'Conflict Resolution & Mediation',
          description:
            'Expertly mediating workplace issues and managing conflict resolution with impartial, swift outcomes.',
        },
        {
          title: 'Disciplinary & Grievance Management',
          description:
            'Providing clear, consistent counsel on performance or conduct issues with proper due process.',
        },
        {
          title: 'Labor Law Adherence',
          description:
            'Continuously monitoring regulatory changes and ensuring practices adhere to all current laws.',
        },
        {
          title: 'Investigation Expertise',
          description:
            'Conducting thorough, confidential internal investigations into harassment, discrimination, or misconduct.',
        },
      ],
      cta: 'Focus on your core mission, knowing your workplace is managed fairly, ethically, and in full compliance with the law.',
    },
  },
  'general-hr-support': {
    title: 'General HR Support',
    subtitle:
      'Unburden Your Team. Efficient, Reliable Daily Assistance for All Routine HR Matters.',
    description:
      'While strategic initiatives drive growth, routine administrative tasks consume valuable time. We handle the everyday so you can focus on the extraordinary.',
    features: [
      'HR Administration',
      'Onboarding & Offboarding',
      'Employee Helpdesk',
      'Compliance Checks',
    ],
    icon: 'LifeBuoy',
    fullContent: {
      overview:
        'The efficiency of your HR department depends on flawless execution of routine tasks. The daily administrative load is essential, yet often time-consuming.',
      pitch:
        'Our General HR Support service provides dedicated, reliable daily assistance with administrative tasks and routine HR matters, acting as a seamless extension of your existing team.',
      approach: [
        {
          title: 'HR Administration',
          description:
            'Managing employee record-keeping, personnel file maintenance, and data integrity with precision.',
        },
        {
          title: 'Onboarding & Offboarding',
          description:
            'Streamlining documentation and administrative processes for new hires and exiting employees.',
        },
        {
          title: 'Employee Helpdesk',
          description:
            'Serving as frontline support for standard questions regarding benefits, policy, and administration.',
        },
        {
          title: 'Compliance Checks',
          description:
            'Performing routine audits to ensure ongoing readiness and accuracy.',
        },
      ],
      cta: 'Free up your internal team to concentrate on strategic business objectives and high-value, core functions.',
    },
  },
  'outsourcing-retainer': {
    title: 'Outsourcing & Retainer',
    subtitle:
      'Full-Spectrum HR, Zero Overhead. Flexible, Dedicated Expertise, Just When You Need It.',
    description:
      'For growing businesses or those in transition, our retainer model offers flexible, dedicated HR support with predictable costs and zero overhead.',
    features: [
      'Dedicated Coverage',
      'Full-Spectrum Support',
      'Cost Predictability',
      'Instant Expertise',
    ],
    icon: 'Briefcase',
    fullContent: {
      overview:
        'For growing businesses, dynamic organisations, or those undergoing transition, scaling the internal HR function to meet complex demands is costly and difficult.',
      pitch:
        'Our Outsourcing and Retainer Services offer the perfect solution: flexible, dedicated HR support on a retainer basis, providing access to a full suite of operational, tactical, and strategic HR expertise.',
      approach: [
        {
          title: 'Dedicated Coverage',
          description:
            'Securing committed HR hours each month, ensuring predictable access to senior consultants for urgent tasks.',
        },
        {
          title: 'Full-Spectrum Support',
          description:
            'Our retainer covers all operational and strategic needs—from policy updates to workforce planning.',
        },
        {
          title: 'Cost Predictability',
          description:
            'Converting variable HR costs into a fixed, manageable monthly expense, without salaries and overhead.',
        },
        {
          title: 'Instant Expertise',
          description:
            'Gaining immediate access to specialized knowledge across all HR disciplines, tailored to your industry.',
        },
      ],
      cta: 'Choose the level of support that fits your current needs and scale easily as your business grows.',
    },
  },
};

// Function to generate static paths for Next.js
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound(); // Display 404 page if service is not found
  }

  return <ServiceClientWrapper service={service} />;
}
