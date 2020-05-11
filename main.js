let MyComponents;
let MyFeatures;

async function getFeatures() {
  await fetch("features.json")
    .then((x) => x.json())
    .then((requirements) => {
      MyFeatures = requirements;
      // CreateFeatureRequirements(requirements.Sharing_Functionality, "Sf");
      // CreateFeatureRequirements(requirements.Chat_System, "Chat System");
      // CreateFeatureRequirements(requirements.Live_Streaming, "Live Streaming");
      CreateFeatureRequirements(requirements.Landing_Page, "Landing page");
      CreateFeatureRequirements(requirements.Video_Functionality, "Video F");
    });
}

async function GetComponents() {
  await fetch("components.json")
    .then((x) => x.json())
    .then((components) => {
      MyComponents = components;
      LogComponents(components.Backend_Component, "UI Component");
      CreateElement(components.Backend_Module);
      GetRequirements(components.Backend_Module);
    });
}

async function LogComponents(compontent, compontentName) {}

function CreateElement(component) {
  let container = document.createElement("div");
  container.classList.add("element-container");

  let MainComponent = document.createElement("div");
  MainComponent.classList.add("main-component");
  MainComponent.innerText = component.name;

  container.appendChild(MainComponent);

  component.requirements.forEach((element) => {
    let RequiredComponent = document.createElement("div");
    RequiredComponent.innerText = `Required: ${element.amount} : ${element.name}`;
    container.appendChild(RequiredComponent);
  });

  document.querySelector("main").appendChild(container);
}

function GetRequirements(component) {
  const list = [];
  component.requirements.forEach((r) => {
    for (let i = 0; i < r.amount; i++) {
      list.push(r.name);
    }
  });
  return list;
}

function GetFeatureRequirements() {
  MyFeatures.Landing_Page.forEach((component) => {});
}

function CreateFeatureRequirements(feature, name) {
  let featureDiv = document.createElement("div");
  featureDiv.classList.add("feature");

  let featureName = document.createElement("h1");
  featureName.innerText = name;
  featureDiv.appendChild(featureName);

  feature.forEach((component) => {
    let requiredComponent = document.createElement("div");
    requiredComponent.classList.add("feature-required-component");
    let componentName = document.createElement("p");
    componentName.innerText = component.name;

    let componentAmount = document.createElement("p");
    componentAmount.innerText = component.amount;

    let dash = document.createElement("p");
    dash.innerText = ":";

    requiredComponent.appendChild(componentName);
    requiredComponent.appendChild(dash);
    requiredComponent.appendChild(componentAmount);

    featureDiv.appendChild(requiredComponent);

    /* Find components required component */
    MyComponents[component.name].requirements.forEach((requiredComponent) => {
      let ComponentsRequiredComponent = document.createElement("p");
      ComponentsRequiredComponent.classList.add("sub-component");
      ComponentsRequiredComponent.innerText = `${component.name} requires ${
        requiredComponent.amount * component.amount
      } ${requiredComponent.name}`;
      featureDiv.appendChild(ComponentsRequiredComponent);

      /*Required-Feature-Component's required component, required component */

      MyComponents[requiredComponent.name].requirements.forEach((rc) => {
        let rfcrcrc = document.createElement("div");
        rfcrcrc.classList.add("sub-sub-requirements");
        let rfcrcrComponent = document.createElement("p");
        rfcrcrComponent.innerText = `${requiredComponent.name} requires ${
          requiredComponent.amount * rc.amount
        } ${rc.name}`;
        rfcrcrComponent.classList.add("sub-sub-component");
        rfcrcrc.appendChild(rfcrcrComponent);
        featureDiv.appendChild(rfcrcrc);

        /*Required-Feature-Component's required component's required components, required component */
        try {
          MyComponents[rc.name].requirements.forEach((rc2) => {
            let rfcrcrc2 = document.createElement("div");
            rfcrcrc2.classList.add("sub-sub-sub-requirements");
            let rfcrcrComponent2 = document.createElement("p");
            rfcrcrComponent.innerText = `${rc.name} requires ${
              rc.amount * rc2.amount
            } ${rc2.name}`;
            rfcrcrComponent2.classList.add("sub-sub-sub-component");
            rfcrcrc2.appendChild(rfcrcrComponent2);
            featureDiv.appendChild(rfcrcrc2);
            console.log(`${rc.name} requires ${rc2.name}`);
          });
        } catch (error) {
          console.log(error);
          console.log(`${MyComponents[rc.name].name} was faulty`);
        }
      });
    });
  });

  document.querySelector("main").appendChild(featureDiv);
}

GetComponents();
getFeatures();
