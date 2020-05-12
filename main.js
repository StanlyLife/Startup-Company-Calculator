let MyComponents;
let MyFeatures;
let featureSelect = document.querySelector("#functioanlities");
let featureBtn = document.querySelector("#add-feature-btn");

async function getFeatures() {
  await fetch("features.json")
    .then((x) => x.json())
    .then((requirements) => {
      MyFeatures = requirements;
      // CreateFeatureRequirements(requirements.Landing_Page, "Landing page");
      // CreateFeatureRequirements(requirements.Help_System, "Help system");
      // CreateFeatureRequirements(requirements.AD_Block_Obfuscator, "Adblocker");
      createSelectorOptions();
    });
}

async function GetComponents() {
  await fetch("components.json")
    .then((x) => x.json())
    .then((components) => {
      MyComponents = components;
      return components;
    });
}

/* Event listeners */
// function SelectedFeature() {
//   console.log(featureSelect.innerText);
//   // CreateFeatureRequirements(,featureSelect.value);
// }

featureBtn.addEventListener("click", (x) => {
  console.log(featureSelect.value);
  CreateFeatureRequirements(
    MyFeatures[featureSelect.value],
    featureSelect.value
  );
});

/* Create options for select dropdown */
function createSelectorOptions() {
  const keys = Object.keys(MyFeatures);

  keys.forEach((feature) => {
    let opt = document.createElement("Option");
    let newOptionName = String(feature).replace(/_/g, " ");
    opt.innerText = newOptionName;
    opt.value = feature;
    featureSelect.appendChild(opt);
  });
}

let requirementsList = [];
let requirementsAmount = [];

function ComponentRequirements(_component, amount) {
  /* parse from feature.component to components.component */
  component = MyComponents[_component.name];
  try {
    console.log(`trying to push ${component.name}`);
  } catch (error) {
    console.log(`Could not create variable ${_component.name}`);
  }
  for (var i = 0; i < amount; i++) {
    requirementsList.push(component.name);
  }
  /* Check if component has requirements */
  if (ComponentHasRequirements(component.requirements)) {
    component.requirements.forEach((requirement) => {
      if (amount > 1) {
        ComponentRequirements(requirement, requirement.amount * amount);
      } else {
        ComponentRequirements(requirement, requirement.amount);
      }
    });
  }
}

function ComponentHasRequirements(requirements) {
  if (requirements.length > 0) {
    return true;
  }
  return false;
}
let counts = {};
function CreateFeatureRequirements(feature, name) {
  requirementsList = [];
  feature.forEach((Requirements) => {
    for (let i = 0; i < Requirements.amount; i++) {
      // requirementsList.push(Requirements.name);
      ComponentRequirements(MyComponents[Requirements.name], 1);
    }
    requirementsList.sort();

    /* */
    /* */
  });
  counts = {};
  requirementsList.forEach(function (x) {
    counts[x] = (counts[x] || 0) + 1;
  });
  CreateFeatureHtml(name);
}

function CreateFeatureHtml(name) {
  const featureContainer = document.createElement("div");
  featureContainer.classList.add("feature");

  featureHeader = document.createElement("h1");
  featureHeader.innerText = name;
  featureContainer.appendChild(featureHeader);

  const componentContainer = document.createElement("div");

  var propValue;
  for (var propName in counts) {
    let componentWrapper = document.createElement("div");
    componentWrapper.classList.add("component-wrapper");
    /* add image */
    if (MyComponents[propName].url != undefined) {
      let componentImage = document.createElement("img");
      componentImage.src = `${MyComponents[propName].url}`;
      componentWrapper.appendChild(componentImage);
    }
    propValue = counts[propName];
    let component = document.createElement("p");
    let componentAmount = document.createElement("p");
    componentAmount.classList.add("amount");

    let newpropName = String(propName).replace(/_/g, " ");

    componentAmount.innerText = `${propValue}`;
    component.innerText = `${newpropName}`;
    componentWrapper.appendChild(componentAmount);
    componentWrapper.appendChild(component);
    componentContainer.appendChild(componentWrapper);
  }

  featureContainer.appendChild(componentContainer);
  document.querySelector("main").appendChild(featureContainer);
}

GetComponents();
getFeatures();
