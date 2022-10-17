import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import styles from "../../globalStyles";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

const About = () => {
  return (
    <SafeAreaView
      style={[
        styles.safeContainer,
        {
          paddingTop: 0,
          position: "relative",
        },
      ]}
    ><StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Terms */}
        <Collapse style={localStyles.collapse}>
          <CollapseHeader>
            <Text style={localStyles.collapse.header}>
              Terms and Conditions
            </Text>
          </CollapseHeader>
          <CollapseBody style={localStyles.collapse.body}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={localStyles.collapse.body.h2}>
                Terms and Conditions
              </Text>

              <Text style={localStyles.collapse.body.p}>Welcome to Bulky!</Text>

              <Text style={localStyles.collapse.body.p}>
                These terms and conditions outline the rules and regulations for
                the use of Bulky App's Website, located at bulky.co.za.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Bulky if you do not agree to
                take all of the terms and conditions stated on this page.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                "Client", "You" and "Your" refers to you, the person log on this
                website and compliant to the Company’s terms and conditions.
                "The Company", "Ourselves", "We", "Our" and "Us", refers to our
                Company. "Party", "Parties", or "Us", refers to both the Client
                and ourselves. All terms refer to the offer, acceptance and
                consideration of payment necessary to undertake the process of
                our assistance to the Client in the most appropriate manner for
                the express purpose of meeting the Client’s needs in respect of
                provision of the Company’s stated services, in accordance with
                and subject to, prevailing law of Netherlands. Any use of the
                above terminology or other words in the singular, plural,
                capitalization and/or he/she or they, are taken as
                interchangeable and therefore as referring to same.
              </Text>

              <Text style={localStyles.collapse.body.h3}> Cookies</Text>

              <Text style={localStyles.collapse.body.p}>
                We employ the use of cookies. By accessing Bulky, you agreed to
                use cookies in agreement with the Bulky App's Privacy Policy.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </Text>

              <Text style={localStyles.collapse.body.h3}> License</Text>

              <Text style={localStyles.collapse.body.p}>
                Unless otherwise stated, Bulky App and/or its licensors own the
                intellectual property rights for all material on Bulky. All
                intellectual property rights are reserved. You may access this
                from Bulky for your own personal use subjected to restrictions
                set in these terms and conditions.
              </Text>

              <Text style={localStyles.collapse.body.p}>You must not:</Text>
              <View style={localStyles.collapse.body.ul}>
                <Text style={localStyles.collapse.body.ul.li}>
                  * Republish material from Bulky
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * Sell, rent or sub-license material from Bulky
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * Reproduce, duplicate or copy material from Bulky
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * Redistribute content from Bulky
                </Text>
              </View>

              <Text style={localStyles.collapse.body.p}>
                This Agreement shall begin on the date hereof. Our Terms and
                <TouchableOpacity style={localStyles.collapse.body.link}>
                  <Text style={localStyles.collapse.body.link.text}>
                    https://www.termsandconditionsgenerator.com/.
                  </Text>
                </TouchableOpacity>
              </Text>

              <Text style={localStyles.collapse.body.p}>
                Parts of this website offer an opportunity for users to post and
                exchange opinions and information in certain areas of the
                website. Bulky App does not filter, edit, publish or review
                Comments prior to their presence on the website. Comments do not
                reflect the views and opinions of Bulky App,its agents and/or
                affiliates. Comments reflect the views and opinions of the
                person who post their views and opinions. To the extent
                permitted by applicable laws, Bulky App shall not be liable for
                the Comments or for any liability, damages or expenses caused
                and/or suffered as a result of any use of and/or posting of
                and/or appearance of the Comments on this website.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                Bulky App reserves the right to monitor all Comments and to
                remove any Comments which can be considered inappropriate,
                offensive or causes breach of these Terms and Conditions.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                You warrant and represent that:
              </Text>

              <View style={localStyles.collapse.body.ul}>
                <Text style={localStyles.collapse.body.ul.li}>
                  * You are entitled to post the Comments on our website and
                  have all necessary licenses and consents to do so;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * The Comments do not invade any intellectual property right,
                  including without limitation copyright, patent or trademark of
                  any third party;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * The Comments do not contain any defamatory, libelous,
                  offensive, indecent or otherwise unlawful material which is an
                  invasion of privacy
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * The Comments will not be used to solicit or promote business
                  or custom or present commercial activities or unlawful
                  activity.
                </Text>
              </View>

              <Text style={localStyles.collapse.body.p}>
                You hereby grant Bulky App a non-exclusive license to use,
                reproduce, edit and authorize others to use, reproduce and edit
                any of your Comments in any and all forms, formats or media.
              </Text>

              <Text style={localStyles.collapse.body.h3}>
                Hyperlinking to our Content
              </Text>

              <Text style={localStyles.collapse.body.p}>
                The following organizations may link to our Website without
                prior written approval:
              </Text>

              <View style={localStyles.collapse.body.ul}>
                <Text style={localStyles.collapse.body.ul.li}>
                  * Government agencies;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * Search engines;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * News organizations;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * Online directory distributors may link to our Website in the
                  same manner as they hyperlink to the Websites of other listed
                  businesses; and
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * System wide Accredited Businesses except soliciting
                  non-profit organizations, charity shopping malls, and charity
                  fundraising groups which may not hyperlink to our Web site.
                </Text>
              </View>

              <Text style={localStyles.collapse.body.p}>
                These organizations may link to our home page, to publications
                or to other Website information so long as the link: (a) is not
                in any way deceptive; (b) does not falsely imply sponsorship,
                endorsement or approval of the linking party and its products
                and/or services; and (c) fits within the context of the linking
                party’s site.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                We may consider and approve other link requests from the
                following types of organizations:
              </Text>

              <View style={localStyles.collapse.body.ul}>
                <Text style={localStyles.collapse.body.ul.li}>
                  * commonly-known consumer and/or business information sources;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * dot.com community sites;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * associations or other groups representing charities;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * online directory distributors;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * internet portals;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * accounting, law and consulting firms; and
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * educational institutions and trade associations.
                </Text>
              </View>

              <Text style={localStyles.collapse.body.p}>
                We will approve link requests from these organizations if we
                decide that: (a) the link would not make us look unfavorably to
                ourselves or to our accredited businesses; (b) the organization
                does not have any negative records with us; (c) the benefit to
                us from the visibility of the hyperlink compensates the absence
                of Bulky App; and (d) the link is in the context of general
                resource information.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                These organizations may link to our home page so long as the
                link: (a) is not in any way deceptive; (b) does not falsely
                imply sponsorship, endorsement or approval of the linking party
                and its products or services; and (c) fits within the context of
                the linking party’s site.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                If you are one of the organizations listed in paragraph 2 above
                and are interested in linking to our website, you must inform us
                by sending an e-mail to Bulky App. Please include your name,
                your organization name, contact information as well as the URL
                of your site, a list of any URLs from which you intend to link
                to our Website, and a list of the URLs on our site to which you
                would like to link. Wait 2-3 weeks for a response.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                Approved organizations may hyperlink to our Website as follows:
              </Text>

              <View style={localStyles.collapse.body.ul}>
                <Text style={localStyles.collapse.body.ul.li}>
                  * By use of our corporate name; or
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * By use of the uniform resource locator being linked to; or
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * By use of any other description of our Website being linked
                  to that makes sense within the context and format of content
                  on the linking party’s site.
                </Text>
              </View>

              <Text style={localStyles.collapse.body.p}>
                No use of Bulky App's logo or other artwork will be allowed for
                linking absent a trademark license agreement.
              </Text>

              <Text style={localStyles.collapse.body.h3}> iFrames</Text>

              <Text style={localStyles.collapse.body.p}>
                Without prior approval and written permission, you may not
                create frames around our Webpages that alter in any way the
                visual presentation or appearance of our Website.
              </Text>

              <Text style={localStyles.collapse.body.h3}>
                Content Liability
              </Text>

              <Text style={localStyles.collapse.body.p}>
                We shall not be hold responsible for any content that appears on
                your Website. You agree to protect and defend us against all
                claims that is rising on your Website. No link(s) should appear
                on any Website that may be interpreted as libelous, obscene or
                criminal, or which infringes, otherwise violates, or advocates
                the infringement or other violation of, any third party rights.
              </Text>

              <Text style={localStyles.collapse.body.h3}> Your Privacy</Text>

              <Text style={localStyles.collapse.body.p}>
                Please read Privacy Policy
              </Text>

              <Text style={localStyles.collapse.body.h3}>
                Reservation of Rights
              </Text>

              <Text style={localStyles.collapse.body.p}>
                We reserve the right to request that you remove all links or any
                particular link to our Website. You approve to immediately
                remove all links to our Website upon request. We also reserve
                the right to amen these terms and conditions and it's linking
                policy at any time. By continuously linking to our Website, you
                agree to be bound to and follow these linking terms and
                conditions.
              </Text>

              <Text style={localStyles.collapse.body.h3}>
                Removal of links from our website
              </Text>

              <Text style={localStyles.collapse.body.p}>
                If you find any link on our Website that is offensive for any
                reason, you are free to contact and inform us any moment. We
                will consider requests to remove links but we are not obligated
                to or so or to respond to you directly.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                We do not ensure that the information on this website is
                correct, we do not warrant its completeness or accuracy; nor do
                we promise to ensure that the website remains available or that
                the material on the website is kept up to date.
              </Text>

              <Text style={localStyles.collapse.body.h3}> Disclaimer</Text>

              <Text style={localStyles.collapse.body.p}>
                To the maximum extent permitted by applicable law, we exclude
                all representations, warranties and conditions relating to our
                website and the use of this website. Nothing in this disclaimer
                will:
              </Text>

              <View style={localStyles.collapse.body.ul}>
                <Text style={localStyles.collapse.body.ul.li}>
                  * limit or exclude our or your liability for death or personal
                  injury;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * limit or exclude our or your liability for fraud or
                  fraudulent misrepresentation;
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * limit any of our or your liabilities in any way that is not
                  permitted under applicable law; or
                </Text>
                <Text style={localStyles.collapse.body.ul.li}>
                  * exclude any of our or your liabilities that may not be
                  excluded under applicable law.
                </Text>
              </View>

              <Text style={localStyles.collapse.body.p}>
                The limitations and prohibitions of liability set in this
                Section and elsewhere in this disclaimer: (a) are subject to the
                preceding paragraph; and (b) govern all liabilities arising
                under the disclaimer, including liabilities arising in contract,
                in tort and for breach of statutory duty.
              </Text>

              <Text style={localStyles.collapse.body.p}>
                As long as the website and the information and services on the
                website are provided free of charge, we will not be liable for
                any loss or damage of any nature.
              </Text>
            </ScrollView>
          </CollapseBody>
        </Collapse>

        {/* POPI */}
        <Collapse style={localStyles.collapse}>
          <CollapseHeader>
            <Text style={localStyles.collapse.header}>Privacy Policy</Text>
          </CollapseHeader>
          <CollapseBody style={localStyles.collapse.body}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View>
                <Text style={localStyles.collapse.body.h1}>Privacy Policy</Text>
                <Text style={localStyles.collapse.body.p}>
                  Last updated: September 25, 2022
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  This Privacy Policy describes Our policies and procedures on
                  the collection, use and disclosure of Your information when
                  You use the Service and tells You about Your privacy rights
                  and how the law protects You.
                </Text>

                <Text style={localStyles.collapse.body.p}>
                  We use Your Personal data to provide and improve the Service.
                  By using the Service, You agree to the collection and use of
                  information in accordance with this Privacy Policy. This
                  Privacy Policy has been created with the help of the
                  <TouchableOpacity style={localStyles.collapse.body.link}>
                    <Text>TermsFeed Privacy Policy Generator</Text>
                  </TouchableOpacity>
                </Text>

                <Text style={localStyles.collapse.body.h1}>
                  Interpretation and Definitions
                </Text>
                <Text style={localStyles.collapse.body.h2}>Interpretation</Text>
                <Text style={localStyles.collapse.body.p}>
                  The words of which the initial letter is capitalized have
                  meanings defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
                </Text>
                <Text style={localStyles.collapse.body.h2}>Definitions</Text>
                <Text style={localStyles.collapse.body.p}>
                  For the purposes of this Privacy Policy:
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Account
                      </Text>
                      means a unique account created for You to access our
                      Service or parts of our Service.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Affiliate
                      </Text>
                      means an entity that controls, is controlled by or is
                      under common control with a party, where
                      &quot;control&quot; means ownership of 50% or more of the
                      shares, equity interest or other securities entitled to
                      vote for election of directors or other managing
                      authority.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Application
                      </Text>
                      means the software program provided by the Company
                      downloaded by You on any electronic device, named Bulky
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Company
                      </Text>
                      (referred to as either &quot;the Company&quot;,
                      &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
                      Agreement) refers to Bulky App, 1 Bunting Rd, Auckland
                      Park, Johannesburg, 2092.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Country
                      </Text>
                      refers to: South Africa
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Device
                      </Text>
                      means any device that can access the Service such as a
                      computer, a cellphone or a digital tablet.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Personal Data
                      </Text>
                      is any information that relates to an identified or
                      identifiable individual.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Service
                      </Text>
                      refers to the Application.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Service Provider
                      </Text>
                      means any natural or legal person who processes the data
                      on behalf of the Company. It refers to third-party
                      companies or individuals employed by the Company to
                      facilitate the Service, to provide the Service on behalf
                      of the Company, to perform services related to the Service
                      or to assist the Company in analyzing how the Service is
                      used.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Usage Data
                      </Text>
                      refers to data collected automatically, either generated
                      by the use of the Service or from the Service
                      infrastructure itself (for example, the duration of a page
                      visit).
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>You</Text>
                      means the individual accessing or using the Service, or
                      the company, or other legal entity on behalf of which such
                      individual is accessing or using the Service, as
                      applicable.
                    </Text>
                  </Text>
                </Text>
                <Text style={localStyles.collapse.body.h1}>
                  {" "}
                  Collecting and Using Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Types of Data Collected
                </Text>
                <Text style={localStyles.collapse.body.h3}> Personal Data</Text>
                <Text style={localStyles.collapse.body.p}>
                  While using Our Service, We may ask You to provide Us with
                  certain personally identifiable information that can be used
                  to contact or identify You. Personally identifiable
                  information may include, but is not limited to:
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      Email address
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      First name and last name
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      Phone number
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      Address, State, Province, ZIP/Postal code, City
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>Usage Data</Text>
                  </Text>
                </Text>
                <Text style={localStyles.collapse.body.h3}> Usage Data</Text>
                <Text style={localStyles.collapse.body.p}>
                  Usage Data is collected automatically when using the Service.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  Usage Data may include information such as Your Device's
                  Internet Protocol address (e.g. IP address), browser type,
                  browser version, the pages of our Service that You visit, the
                  time and date of Your visit, the time spent on those pages,
                  unique device identifiers and other diagnostic data.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  When You access the Service by or through a mobile device, We
                  may collect certain information automatically, including, but
                  not limited to, the type of mobile device You use, Your mobile
                  device unique ID, the IP address of Your mobile device, Your
                  mobile operating system, the type of mobile Internet browser
                  You use, unique device identifiers and other diagnostic data.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  We may also collect information that Your browser sends
                  whenever You visit our Service or when You access the Service
                  by or through a mobile device.
                </Text>
                <Text style={localStyles.collapse.body.h3}>
                  Information Collected while Using the Application
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  While using Our Application, in order to provide features of
                  Our Application, We may collect, with Your prior permission:
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    Information regarding your location
                  </Text>
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  We use this information to provide features of Our Service, to
                  improve and customize Our Service. The information may be
                  uploaded to the Company's servers and/or a Service Provider's
                  server or it may be simply stored on Your device.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  You can enable or disable access to this information at any
                  time, through Your Device settings.
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Use of Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  The Company may use Personal Data for the following purposes:
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        To provide and maintain our Service
                      </Text>
                      , including to monitor the usage of our Service.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        To manage Your Account:
                      </Text>
                      to manage Your registration as a user of the Service. The
                      Personal Data You provide can give You access to different
                      functionalities of the Service that are available to You
                      as a registered user.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        For the performance of a contract:
                      </Text>
                      the development, compliance and undertaking of the
                      purchase contract for the products, items or services You
                      have purchased or of any other contract with Us through
                      the Service.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        To contact You:
                      </Text>
                      To contact You by email, telephone calls, SMS, or other
                      equivalent forms of electronic communication, such as a
                      mobile application's push notifications regarding updates
                      or informative communications related to the
                      functionalities, products or contracted services,
                      including the security updates, when necessary or
                      reasonable for their implementation.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        To provide You
                      </Text>
                      with news, special offers and general information about
                      other goods, services and events which we offer that are
                      similar to those that you have already purchased or
                      enquired about unless You have opted not to receive such
                      information.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        To manage Your requests:
                      </Text>
                      To attend and manage Your requests to Us.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        For business transfers:
                      </Text>
                      We may use Your information to evaluate or conduct a
                      merger, divestiture, restructuring, reorganization,
                      dissolution, or other sale or transfer of some or all of
                      Our assets, whether as a going concern or as part of
                      bankruptcy, liquidation, or similar proceeding, in which
                      Personal Data held by Us about our Service users is among
                      the assets transferred.
                    </Text>
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        For other purposes
                      </Text>
                      : We may use Your information for other purposes, such as
                      data analysis, identifying usage trends, determining the
                      effectiveness of our promotional campaigns and to evaluate
                      and improve our Service, products, services, marketing and
                      your experience.
                    </Text>
                  </Text>
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  We may share Your personal information in the following
                  situations:
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p.bold}>
                      With Service Providers:
                    </Text>
                    We may share Your personal information with Service
                    Providers to monitor and analyze the use of our Service, to
                    contact You.
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p.bold}>
                      For business transfers:
                    </Text>
                    We may share or transfer Your personal information in
                    connection with, or during negotiations of, any merger, sale
                    of Company assets, financing, or acquisition of all or a
                    portion of Our business to another company.
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p.bold}>
                      With Affiliates:
                    </Text>
                    We may share Your information with Our affiliates, in which
                    case we will require those affiliates to honor this Privacy
                    Policy. Affiliates include Our parent company and any other
                    subsidiaries, joint venture partners or other companies that
                    We control or that are under common control with Us.
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p.bold}>
                      With business partners:
                    </Text>
                    We may share Your information with Our business partners to
                    offer You certain products, services or promotions.
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p.bold}>
                      With other users:
                    </Text>
                    when You share personal information or otherwise interact in
                    the public areas with other users, such information may be
                    viewed by all users and may be publicly distributed outside.
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p.bold}>
                      With Your consent
                    </Text>
                    : We may disclose Your personal information for any other
                    purpose with Your consent.
                  </Text>
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Retention of Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  The Company will retain Your Personal Data only for as long as
                  is necessary for the purposes set out in this Privacy Policy.
                  We will retain and use Your Personal Data to the extent
                  necessary to comply with our legal obligations (for example,
                  if we are required to retain your data to comply with
                  applicable laws), resolve disputes, and enforce our legal
                  agreements and policies.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  The Company will also retain Usage Data for internal analysis
                  purposes. Usage Data is generally retained for a shorter
                  period of time, except when this data is used to strengthen
                  the security or to improve the functionality of Our Service,
                  or We are legally obligated to retain this data for longer
                  time periods.
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Transfer of Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  Your information, including Personal Data, is processed at the
                  Company's operating offices and in any other places where the
                  parties involved in the processing are located. It means that
                  this information may be transferred to — and maintained on —
                  computers located outside of Your state, province, country or
                  other governmental jurisdiction where the data protection laws
                  may differ than those from Your jurisdiction.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  Your consent to this Privacy Policy followed by Your
                  submission of such information represents Your agreement to
                  that transfer.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  The Company will take all steps reasonably necessary to ensure
                  that Your data is treated securely and in accordance with this
                  Privacy Policy and no transfer of Your Personal Data will take
                  place to an organization or a country unless there are
                  adequate controls in place including the security of Your data
                  and other personal information.
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Delete Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  You have the right to delete or request that We assist in
                  deleting the Personal Data that We have collected about You.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  Our Service may give You the ability to delete certain
                  information about You from within the Service.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  You may update, amend, or delete Your information at any time
                  by signing in to Your Account, if you have one, and visiting
                  the account settings section that allows you to manage Your
                  personal information. You may also contact Us to request
                  access to, correct, or delete any personal information that
                  You have provided to Us.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  Please note, however, that We may need to retain certain
                  information when we have a legal obligation or lawful basis to
                  do so.
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Disclosure of Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.h3}>
                  Business Transactions
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  If the Company is involved in a merger, acquisition or asset
                  sale, Your Personal Data may be transferred. We will provide
                  notice before Your Personal Data is transferred and becomes
                  subject to a different Privacy Policy.
                </Text>
                <Text style={localStyles.collapse.body.h3}>
                  {" "}
                  Law enforcement
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  Under certain circumstances, the Company may be required to
                  disclose Your Personal Data if required to do so by law or in
                  response to valid requests by public authorities (e.g. a court
                  or a government agency).
                </Text>
                <Text style={localStyles.collapse.body.h3}>
                  Other legal requirements
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  The Company may disclose Your Personal Data in the good faith
                  belief that such action is necessary to:
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    Comply with a legal obligation
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    Protect and defend the rights or property of the Company
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    Prevent or investigate possible wrongdoing in connection
                    with the Service
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    Protect the personal safety of Users of the Service or the
                    public
                  </Text>
                  <Text style={localStyles.collapse.body.ul.li}>
                    Protect against legal liability
                  </Text>
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Security of Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  The security of Your Personal Data is important to Us, but
                  remember that no method of transmission over the Internet, or
                  method of electronic storage is 100% secure. While We strive
                  to use commercially acceptable means to protect Your Personal
                  Data, We cannot guarantee its absolute security.
                </Text>
                <Text style={localStyles.collapse.body.h1}>
                  Detailed Information on the Processing of Your Personal Data
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  The Service Providers We use may have access to Your Personal
                  Data. These third-party vendors collect, store, use, process
                  and transfer information about Your activity on Our Service in
                  accordance with their Privacy Policies.
                </Text>
                <Text style={localStyles.collapse.body.h2}>
                  Usage, Performance and Miscellaneous
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  We may use third-party Service Providers to provide better
                  improvement of our Service.
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      <Text style={localStyles.collapse.body.p.bold}>
                        Google Places
                      </Text>
                    </Text>
                    <Text style={localStyles.collapse.body.p}>
                      Google Places is a service that returns information about
                      places using HTTP requests. It is operated by Google
                    </Text>
                    <Text style={localStyles.collapse.body.p}>
                      Google Places service may collect information from You and
                      from Your Device for security purposes.
                    </Text>
                    <Text style={localStyles.collapse.body.p}>
                      The information gathered by Google Places is held in
                      accordance with the Privacy Policy of Google:
                      <TouchableOpacity style={localStyles.collapse.body.link}>
                        {/* {href="https://www.google.com/intl/en/policies/privacy/"
                      rel="external nofollow noopener"
                      target="_blank"} */}

                        <Text style={localStyles.collapse.body.link.text}>
                          https://www.google.com/intl/en/policies/privacy/
                        </Text>
                      </TouchableOpacity>
                    </Text>
                  </Text>
                </Text>

                <Text style={localStyles.collapse.body.h1}>
                  Children's Privacy
                </Text>

                <Text style={localStyles.collapse.body.p}>
                  Our Service does not address anyone under the age of 13. We do
                  not knowingly collect personally identifiable information from
                  anyone under the age of 13. If You are a parent or guardian
                  and You are aware that Your child has provided Us with
                  Personal Data, please contact Us. If We become aware that We
                  have collected Personal Data from anyone under the age of 13
                  without verification of parental consent, We take steps to
                  remove that information from Our servers.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  If We need to rely on consent as a legal basis for processing
                  Your information and Your country requires consent from a
                  parent, We may require Your parent's consent before We collect
                  and use that information.
                </Text>
                <Text style={localStyles.collapse.body.h1}>
                  {" "}
                  Links to Other Websites
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  Our Service may contain links to other websites that are not
                  operated by Us. If You click on a third party link, You will
                  be directed to that third party's site. We strongly advise You
                  to review the Privacy Policy of every site You visit.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  We have no control over and assume no responsibility for the
                  content, privacy policies or practices of any third party
                  sites or services.
                </Text>
                <Text style={localStyles.collapse.body.h1}>
                  {" "}
                  Changes to this Privacy Policy
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  We may update Our Privacy Policy from time to time. We will
                  notify You of any changes by posting the new Privacy Policy on
                  this page.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  We will let You know via email and/or a prominent notice on
                  Our Service, prior to the change becoming effective and update
                  the &quot;Last updated&quot; date at the top of this Privacy
                  Policy.
                </Text>
                <Text style={localStyles.collapse.body.p}>
                  You are advised to review this Privacy Policy periodically for
                  any changes. Changes to this Privacy Policy are effective when
                  they are posted on this page.
                </Text>
                <Text style={localStyles.collapse.body.h1}> Contact Us</Text>
                <Text style={localStyles.collapse.body.p}>
                  If you have any questions about this Privacy Policy, You can
                  contact us:
                </Text>
                <Text style={localStyles.collapse.body.ul}>
                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      By email: axolemaranjana4@gmail.com
                    </Text>
                  </Text>

                  <Text style={localStyles.collapse.body.ul.li}>
                    <Text style={localStyles.collapse.body.p}>
                      By phone number: +27681721606
                    </Text>
                  </Text>
                </Text>
              </View>
            </ScrollView>
          </CollapseBody>
        </Collapse>
      </ScrollView>

      <Text style={localStyles.version}>Version: 1.0.0</Text>
    </SafeAreaView>
  );
};
export default About;

const localStyles = StyleSheet.create({
  collapse: {
    elevation: 3,
    marginBottom: 15,
    header: {
      flex: 1,
      fontSize: 16,
      borderWidth: 0.3,
      borderRadius: 15,
      fontWeight: "600",
      paddingVertical: 15,
      paddingHorizontal: 20,
      flexDirection: "column",
      backgroundColor: styles.blackWhiteText.color,
    },
    body: {
      padding: 10,
      fontSize: 14,
      marginTop: 10,
      borderRadius: 5,
      fontWeight: "300",
      textAlign: "justify",
      flexDirection: "column",
      backgroundColor: styles.blackWhiteText.color,
      p: {
        flex: 1,
        marginLeft: 10,
        marginVertical: 5,
        flexDirection: "column",
        bold: {
          fontWeight: "600",
        },
      },
      link: { text: { color: styles.purpleText.color } },
      h3: { fontSize: 16, fontWeight: "600" },
      ul: { marginLeft: 15, li: { marginLeft: 10 } },
      h2: { fontSize: 16, fontWeight: "700" },
      h1: { fontSize: 18, fontWeight: "800", marginVertical: 5 },
    },
  },
  version: {
    alignSelf: "center",
    color: styles.greyText.color,
  },
});
