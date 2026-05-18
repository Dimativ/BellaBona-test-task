import {defineType, defineField, defineArrayMember} from 'sanity'

export const contactFormBlock = defineType({
  name: 'contactFormBlock',
  title: 'Contact Form Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'e.g. "Got Questions? Let\'s Talk Lunch."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'contactPerson',
      title: 'Contact Person',
      type: 'object',
      fields: [
        defineField({
          name: 'photo',
          title: 'Photo',
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({name: 'email', title: 'Email', type: 'string'}),
        defineField({name: 'phone', title: 'Phone', type: 'string'}),
      ],
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'localeString',
      description: 'e.g. "Schedule an appointment now"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'labels',
      title: 'Field Labels',
      type: 'object',
      fields: [
        defineField({name: 'name', title: 'Name Label', type: 'localeString'}),
        defineField({name: 'namePlaceholder', title: 'Name Placeholder', type: 'localeString'}),
        defineField({name: 'company', title: 'Company Label', type: 'localeString'}),
        defineField({
          name: 'companyPlaceholder',
          title: 'Company Placeholder',
          type: 'localeString',
        }),
        defineField({name: 'email', title: 'Email Label', type: 'localeString'}),
        defineField({name: 'emailPlaceholder', title: 'Email Placeholder', type: 'localeString'}),
        defineField({name: 'phone', title: 'Phone Label', type: 'localeString'}),
        defineField({name: 'phonePlaceholder', title: 'Phone Placeholder', type: 'localeString'}),
        defineField({name: 'companySize', title: 'Company Size Label', type: 'localeString'}),
        defineField({
          name: 'companySizePlaceholder',
          title: 'Company Size Placeholder',
          type: 'localeString',
        }),
        defineField({name: 'comments', title: 'Comments Label', type: 'localeString'}),
        defineField({
          name: 'commentsPlaceholder',
          title: 'Comments Placeholder',
          type: 'localeString',
        }),
        defineField({name: 'agreement', title: 'Agreement Text', type: 'localeString'}),
      ],
    }),
    defineField({
      name: 'companySizeOptions',
      title: 'Company Size Options',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'companySizeOption',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
            defineField({name: 'value', title: 'Value', type: 'string'}),
          ],
          preview: {
            select: {label: 'label.en', value: 'value'},
            prepare: ({label, value}) => ({title: label || value || 'Option'}),
          },
        }),
      ],
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
          initialValue: 'darkGreen',
        }),
      ],
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Contact Form', subtitle: 'Contact Form Block'}),
  },
})
