import {defineType, defineField} from 'sanity'

export const quoteCalculatorBlock = defineType({
  name: 'quoteCalculatorBlock',
  title: 'Quote Calculator Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'daysQuestion',
      title: 'Days Question',
      type: 'localeString',
      description: 'e.g. "How many days per week do you want to offer lunch?"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dayLabelSingular',
      title: 'Day Label (singular)',
      type: 'localeString',
      description: 'e.g. "Day"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dayLabelPlural',
      title: 'Day Label (plural)',
      type: 'localeString',
      description: 'e.g. "Days"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employeesQuestion',
      title: 'Employees Question',
      type: 'localeString',
      description: 'e.g. "How many employees will roughly join?"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employeesUnitLabel',
      title: 'Employees Unit Label',
      type: 'localeString',
      description: 'e.g. "Employees"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subsidyQuestion',
      title: 'Subsidy Question',
      type: 'localeString',
      description: 'e.g. "How much of each meal will your company cover?"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subsidyUnitLabel',
      title: 'Subsidy Unit Label',
      type: 'localeString',
      description: 'e.g. "Subsidy"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employeesCard',
      title: 'Employees Result Card',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Card Title',
          type: 'localeString',
          description: 'e.g. "What your employees pay per meal"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'perUnitLabel',
          title: 'Per Unit Label',
          type: 'localeString',
          description: 'e.g. "Per employee per dish"',
        }),
        defineField({
          name: 'note',
          title: 'Note',
          type: 'localeString',
          description: 'e.g. "Employees top up their virtual wallet..."',
        }),
      ],
    }),
    defineField({
      name: 'companyCard',
      title: 'Company Result Card',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Card Title',
          type: 'localeString',
          description: 'e.g. "What your company pays per month"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'perUnitLabel',
          title: 'Per Unit Label',
          type: 'localeString',
          description: 'e.g. "Per month total"',
        }),
        defineField({
          name: 'note',
          title: 'Note',
          type: 'localeString',
          description: 'e.g. "You only pay what your team orders..."',
        }),
      ],
    }),
    defineField({
      name: 'emailLabel',
      title: 'Email Field Label',
      type: 'localeString',
      description: 'e.g. "Enter your email for a custom breakdown..."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cta',
      title: 'Submit Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'localeString',
          description: 'e.g. "Get Custom Quote"',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'color',
          title: 'Button Color',
          type: 'string',
          options: {
            list: [
              {title: 'Green', value: 'green'},
              {title: 'Dark Green', value: 'darkGreen'},
              {title: 'Light Green', value: 'lightGreen'},
              {title: 'Red', value: 'red'},
            ],
            layout: 'radio',
          },
          initialValue: 'green',
        }),
      ],
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Quote Calculator', subtitle: 'Quote Calculator Block'}),
  },
})
