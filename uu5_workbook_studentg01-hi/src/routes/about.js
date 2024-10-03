//@@viewOn:imports
import {
  Utils,
  createVisualComponent,
  Environment,
  useLsi,
  Lsi,
  DynamicLibraryComponent,
  useSession,
  useDynamicLibraryComponent,
} from "uu5g05";
import Uu5Elements from "uu5g05-elements";
import { useSubApp, useSystemData } from "uu_plus4u5g02";
import Plus4U5App, { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import LSI from "../config/lsi.js";
import AboutCfg from "../config/about.js";
import RouteBar from "../core/route-bar.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
const Css = {
  content: () => Config.Css.css`
    margin: 0 auto;
    max-width: 920px;

    .plus4u5-app-about > .uu5-bricks-header,
    .plus4u5-app-licence > .uu5-bricks-header,
    .plus4u5-app-authors > .uu5-bricks-header,
    .plus4u5-app-technologies > .uu5-bricks-header {
      border-bottom: 0;
    }

    .plus4u5-app-authors > .uu5-bricks-header {
      margin: 20px 0 10px 0;
      text-align: center;
    }

    > *:last-child {
      padding-bottom: 56px;
    }
  `,
  technologies: () => Config.Css.css({ maxWidth: 480 }),
  logos: () => Config.Css.css({ textAlign: "center", marginTop: 56 }),
  common: () =>
    Config.Css.css({
      maxWidth: 480,
      margin: "12px auto 56px",

      "& > *": {
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
        padding: "9px 0 12px",
        textAlign: "center",
        color: "#828282",
        "&:last-child": {
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        },
      },
    }),
  technologiesLicenseRow: () =>
    Config.Css.css({
      display: "grid",
      gridTemplateColumns: "minmax(0, 12fr)",
      marginTop: 40,
      padding: "0 8px",
      gap: "0 16px",
      borderTop: "1px solid rgba(0,0,0,.12)",
      ...Utils.Style.getMinMediaQueries("l", {
        gridTemplateColumns: "minmax(0, 8fr) minmax(0, 4fr)",
      }),
    }),
  license: () => Config.Css.css({ width: "auto" }),
};
//@@viewOff:css

//@@viewOn:helpers
function getAuthors(authors) {
  return authors?.map((author) => {
    author = { ...author };
    author.role = author.role && typeof author.role === "object" ? <Lsi lsi={author.role} /> : author.role;
    return author;
  });
}
//@@viewOff:helpers

let About = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "About",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    showRouteBar: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    showRouteBar: true,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { awid } = useSubApp();
    const { state: sessionState } = useSession();
    const { data: systemData } = useSystemData();
    const {
      uuAppUuFlsBaseUri,
      uuAppUuSlsBaseUri,
      uuAppBusinessModelUri,
      uuAppApplicationModelUri,
      uuAppBusinessRequestsUri,
      uuAppUserGuideUri,
      uuAppWebKitUri,
      uuAppProductPortalUri,
    } = systemData?.relatedObjectsMap || {};
    const products = [];
    if (uuAppBusinessModelUri) products.push({ baseUri: uuAppBusinessModelUri });
    if (uuAppApplicationModelUri) products.push({ baseUri: uuAppApplicationModelUri });
    if (uuAppBusinessRequestsUri) products.push({ baseUri: uuAppBusinessRequestsUri });
    if (uuAppUserGuideUri) products.push({ baseUri: uuAppUserGuideUri });
    if (uuAppWebKitUri) products.push({ baseUri: uuAppWebKitUri });

    const aboutLsi = AboutCfg.about || {};
    const licence = AboutCfg.licence || {};
    const usedTechnologies = AboutCfg.usedTechnologies || {};

    // NOTE Some of these cannot be passed as prop={<Lsi />} therefore we're using useLsi() hook.
    const about = useLsi(aboutLsi);
    const organisation = useLsi(licence.organisation);
    const authorities = useLsi(licence.authorities);
    const technologies = useLsi(usedTechnologies.technologies);
    const content = useLsi(usedTechnologies.content);

    const header = useLsi(LSI.about.header);
    const creatorsHeader = useLsi(LSI.about.creatorsHeader);
    const termsOfUse = useLsi(LSI.about.termsOfUse);

    const { state } = useDynamicLibraryComponent("Plus4U5.App.About");
    const legacyComponentsReady = !state.startsWith("pending");
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const leadingAuthors = getAuthors(AboutCfg.leadingAuthors);
    const otherAuthors = getAuthors(AboutCfg.otherAuthors);
    const attrs = Utils.VisualComponent.getAttrs(props);
    return legacyComponentsReady ? (
      <div {...attrs}>
        {props.showRouteBar && <RouteBar />}
        <div className={Css.content()}>
          <DynamicLibraryComponent uu5Tag="Plus4U5.App.About" header={header} content={about} />
          {sessionState === "authenticated" ? (
            <DynamicLibraryComponent
              uu5Tag="Plus4U5.App.Support"
              uuFlsUri={uuAppUuFlsBaseUri}
              uuSlsUri={uuAppUuSlsBaseUri}
              productCode="support/uu5Workbook"
              productPortalUri={uuAppProductPortalUri}
            />
          ) : null}
          {products.length > 0 ? (
            <DynamicLibraryComponent uu5Tag="UuProductCatalogue.Bricks.ProductList" type="16x9" products={products} />
          ) : null}
          <div className={Css.common()}>
            <div>{`uu5Workbook ${Environment.appVersion}`}</div>
            {licence.termsOfUse && (
              <div>
                <Uu5Elements.Link href={licence.termsOfUse} target="_blank">
                  {termsOfUse}
                </Uu5Elements.Link>
              </div>
            )}
          </div>
          <DynamicLibraryComponent
            uu5Tag="Plus4U5.App.Authors"
            header={creatorsHeader}
            leadingAuthors={leadingAuthors}
            otherAuthors={otherAuthors}
          />
          <div className={Css.technologiesLicenseRow()}>
            <div>
              <DynamicLibraryComponent
                uu5Tag="Plus4U5.App.Technologies"
                technologies={technologies}
                content={content}
                textAlign="left"
                className={Css.technologies()}
              />
            </div>
            <div>
              <DynamicLibraryComponent
                uu5Tag="Plus4U5.App.Licence"
                organisation={organisation}
                authorities={authorities}
                awid={<Uu5Elements.Link href={Environment.appBaseUri}>{awid}</Uu5Elements.Link>}
                textAlign="left"
                className={Css.license()}
              />
            </div>
          </div>
          <div className={Css.logos()}>
            <img height={80} src="assets/plus4u.svg" />
            <img height={80} src="assets/unicorn.svg" />
          </div>
        </div>
      </div>
    ) : (
      <Plus4U5App.SpaPending />
    );
  },
  //@@viewOff:render
});

About = withRoute(About);

//@@viewOn:exports
export { About };
export default About;
//@@viewOff:exports
