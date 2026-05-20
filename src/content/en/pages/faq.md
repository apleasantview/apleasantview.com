---
title: 'Frequently asked questions'
description: 'Answers to common questions about ongoing website maintenance, IT support, and small projects in Amsterdam-West and the Jordaan.'
slug: 'faq'
type: 'faq'
permalink: '/faq/'
translationKey: 'faq'
date: 2026-05-19
faqs:
  - question: 'Are you taking new clients?'
    answer: >
      Yes, when there's room. I keep the client list deliberately small to keep the quality consistent. Send a short note for current availability.
  - question: 'What kinds of businesses do you work with?'
    answer: >
      Small businesses around the corner: shops, studios, cafés, freelance professionals, small service providers. Mostly in Amsterdam-West and the Jordaan. Not for large enterprises or complex e-commerce platforms; other parties are better suited for those.
  - question: "What's included and not included in the support plan?"
    answer: >
      The plan (€85/month) covers up to 1 hour of web and IT support per month: small fixes, updates, hosting management, email and login matters, small device issues. Not included: large build or rebuild work, full IT helpdesk, 24/7 monitoring, hardware sales. For larger work I use scoped [website projects](/services/website-projects/).
  - question: 'Do you work with WordPress?'
    answer: >
      Yes, I maintain existing WordPress sites. For new projects I often prefer simpler static stacks that are easier to maintain and cheaper to host. Case by case.
  - question: 'Can you migrate my site?'
    answer: >
      Yes, migrations are part of the work: platform to platform (for example, WordPress to a static site), host to host, or an old version to a refreshed one. Often a good moment to clear some technical debt at the same time.
  - question: 'Can I cancel anytime?'
    answer: >
      Yes, with one month's notice. No long contracts.
---

<section class="u-flow">

# Frequently asked questions

Short answers to questions that come up often when people are considering an ongoing support relationship or a project.

</section>

<section class="u-flow">

{% for faq in faqs %}

## {{ faq.question }}

{{ faq.answer | safe }}

{% endfor %}

</section>

<section class="u-flow">

## Something else?

Question not listed? [[contact|Send a short note →]] and I'll reply within a day.

</section>
