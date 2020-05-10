let MyComponents;
let MyFeatures;

async function getFeatures() {
  await fetch("features.json")
    .then((x) => x.json())
    .then((requirements) => {
      MyFeatures = requirements;
      CreateFeatureRequirements(
        requirements.Sharing_Functionality,
        "Sharing_Functionality"
      );
      CreateFeatureRequirements(requirements.Live_Streaming, "Live Streaming");
      CreateFeatureRequirements(requirements.Landing_Page, "Landing page");
      CreateFeatureRequirements(
        requirements.Video_Functionality,
        "Video Functionality"
      );
    });
}

async function GetComponents() {
  await fetch("components.json")
    .then((x) => x.json())
    .then((components) => {
      console.log(components);
      MyComponents = components;
      LogComponents(components.Backend_Component, "UI Component");
      CreateElement(components.Backend_Module);
      GetRequirements(components.Backend_Module);
    });
}

async function LogComponents(compontent, compontentName) {
  console.log(`${compontentName} `);
  console.log(`Component role ${compontent.role}`);
  console.log(`Component time ${compontent.time}`);
  console.log(`Component requirements ${compontent.requirements}`);
}

function CreateElement(component) {
  let container = document.createElement("div");
  container.classList.add("element-container");

  let MainComponent = document.createElement("div");
  MainComponent.classList.add("main-component");
  MainComponent.innerText = component.name;

  container.appendChild(MainComponent);

  component.requirements.forEach((element) => {
    console.log(`added ${element.name}`);
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
      console.log(r.name);
    }
  });
  return list;
}

function GetFeatureRequirements() {
  MyFeatures.Landing_Page.forEach((component) => {
    console.log(
      `Landing page component: ${component.amount}: ${component.name}`
    );
  });
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
      console.log(`${component.name} requires ${requiredComponent.name}`);
      let ComponentsRequiredComponent = document.createElement("p");
      ComponentsRequiredComponent.classList.add(
        "components-required-component"
      );
      ComponentsRequiredComponent.innerText = `${component.name} requires ${
        requiredComponent.amount * component.amount
      } ${requiredComponent.name}`;
      featureDiv.appendChild(ComponentsRequiredComponent);
    });
  });

  document.querySelector("main").appendChild(featureDiv);
}

GetComponents();
getFeatures();
