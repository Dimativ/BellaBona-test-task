import { defineQuery } from 'next-sanity';

export const homePageQuery = defineQuery(`
  *[_type == "homePage"][0]{
    _id,
    seo {
      ...,
      ogImage { asset->{ url } }
    },
    blocks[] {
      _type,
      _key,
      _type == "homeHeroBlock" => {
        title,
        subtitle,
        cta {
          text,
          link,
          color
        },
        image {
          asset->{ url },
          hotspot,
          crop,
          alt
        },
        linksImgs[] {
          _key,
          link,
          image {
            asset->{ url },
            alt
          }
        }
      },
      _type == "trustedByBlock" => {
        title,
        logos[] {
          _key,
          link,
          image {
            asset->{ url },
            alt
          }
        }
      },
      _type == "statsBlock" => {
        items[] {
          _key,
          value,
          label
        }
      },
      _type == "mealsShowcaseBlock" => {
        title,
        cta {
          text,
          color,
          file {
            asset->{ url, originalFilename }
          }
        },
        meals[]-> {
          _id,
          name,
          slug,
          cardReviewString,
          cardImage {
            asset->{ url },
            hotspot,
            crop,
            alt
          },
          category->{
            _id,
            title,
            slug
          },
          seo {
            ...,
            ogImage { asset->{ url } }
          }
        }
      },
      _type == "perksBlock" => {
        title,
        cards[] {
          _key,
          value,
          valueLabel,
          description
        },
        image {
          asset->{ url },
          hotspot,
          crop,
          alt
        },
        features[] {
          _key,
          title,
          description
        }
      },
      _type == "splitCtaBlock" => {
        title,
        description,
        bgColor,
        cta {
          text,
          link,
          color
        },
        image {
          asset->{ url },
          hotspot,
          crop,
          alt
        }
      },
      _type == "stepsBlock" => {
        title,
        cta {
          text,
          link,
          color
        },
        steps[] {
          _key,
          tagline,
          title,
          description,
          image {
            asset->{ url },
            hotspot,
            crop,
            alt
          }
        }
      },
      _type == "reviewsCarouselBlock" => {
        title,
        reviews[]-> {
          _id,
          richText,
          author,
          position,
          photo {
            asset->{ url },
            hotspot,
            crop,
            alt
          }
        }
      },
      _type == "quoteCalculatorBlock" => {
        title,
        daysQuestion,
        dayLabelSingular,
        dayLabelPlural,
        employeesQuestion,
        employeesUnitLabel,
        subsidyQuestion,
        subsidyUnitLabel,
        employeesCard {
          title,
          perUnitLabel,
          note
        },
        companyCard {
          title,
          perUnitLabel,
          note
        },
        emailLabel,
        cta {
          text,
          color
        }
      },
      _type == "contactFormBlock" => {
        title,
        description,
        formTitle,
        contactPerson {
          name,
          email,
          phone,
          photo {
            asset->{ url },
            hotspot,
            crop,
            alt
          }
        },
        labels,
        companySizeOptions[] {
          _key,
          label,
          value
        },
        cta {
          text,
          color
        }
      },
      _type == "faqBlock" => {
        title,
        items[] {
          _key,
          question,
          answer
        }
      }
    }
  }
`);

export const headerQuery = defineQuery(`
  *[_type == "header"][0]{
    _id,
    navItems[] {
      title,
      href,
      isMegaMenu,
      subItems[] { title, href }
    },
    menuButton {
      text,
      pdf {
        asset->{ url, originalFilename }
      }
    },
    cta {
      text,
      link,
      color
    }
  }
`);

export const footerQuery = defineQuery(`
  *[_type == "footer"][0]{
    _id,
    foreColumnTitle,
    foreColumnText,
    columns[] {
      _key,
      title,
      items[] {
        _key,
        label,
        href
      }
    },
    bigLogoImage {
      asset->{ url },
      hotspot,
      crop,
      alt
    },
    copyright
  }
`);

export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    _id,
    favicon { asset->{ url } },
    primaryDomain,
    orgName,
    orgLegalName,
    orgDescription,
    logo {
      asset->{ url },
      alt
    },
    contactPhone {
      icon { asset->{ url } },
      value
    },
    contactEmail {
      icon { asset->{ url } },
      value
    },
    headOffice {
      icon { asset->{ url } },
      label,
      googleMapsLink
    },
    socials[] {
      _key,
      name,
      link,
      svgIcon { asset->{ url } }
    }
  }
`);
