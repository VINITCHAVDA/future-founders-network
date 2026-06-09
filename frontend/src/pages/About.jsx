import FeatureCard from '../components/FeatureCard'
import PageHeader from '../components/PageHeader'
import SectionHeader from '../components/SectionHeader'

function About() {
  return (
    <>
      <section className="page-shell about-hero">
        <PageHeader eyebrow="About Future Founders Network" title="A student-first platform for building real startup momentum.">
          Future Founders Network helps students move beyond inspiration and into action through chapters, events, mentorship, community posts, and membership opportunities.
        </PageHeader>
        <div className="mission-panel">
          <div>
            <p className="eyebrow">Mission</p>
            <h2>Make entrepreneurship accessible to every student with ambition.</h2>
            <p>We bring together builders from different colleges, courses, and cities so they can learn faster, meet collaborators, and test ideas with a supportive network.</p>
          </div>
          <div>
            <p className="eyebrow">Vision</p>
            <h2>Turn campuses into connected startup ecosystems.</h2>
            <p>Our vision is a network where every student founder can find local community, trusted feedback, and practical startup support before graduation.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeader eyebrow="Why this platform?" title="Built for the messy early stage" align="center">
          Most students do not need more theory. They need people, practice, feedback, and a clear place to show what they are building.
        </SectionHeader>
        <div className="grid three">
          <article className="story-card"><h3>Find your people</h3><p>Join chapters and meet students who care about startups, business, design, engineering, marketing, and operations.</p></article>
          <article className="story-card"><h3>Learn by doing</h3><p>Attend events, practice pitching, publish updates, and get feedback while your idea is still flexible.</p></article>
          <article className="story-card"><h3>Grow with structure</h3><p>Profiles, posts, memberships, and admin-managed chapters help the community stay organized and useful.</p></article>
        </div>
      </section>

      <section className="section alt-section">
        <SectionHeader eyebrow="Our values" title="What guides the network" align="center" />
        <div className="grid four">
          <FeatureCard icon="🌐" title="Community">A welcoming space for students across backgrounds, colleges, and skill levels.</FeatureCard>
          <FeatureCard icon="📈" title="Growth">Every event, post, and connection should help members become better builders.</FeatureCard>
          <FeatureCard icon="💡" title="Innovation">We encourage practical experiments, creative ideas, and thoughtful problem solving.</FeatureCard>
          <FeatureCard icon="🏆" title="Leadership">Students learn to lead chapters, teams, events, and startup initiatives.</FeatureCard>
        </div>
      </section>
    </>
  )
}

export default About
