const accordionItemHeaders = document.querySelectorAll(".header");

function getParents(el) {
    let parent = el.parentElement || {};
    const parents = [];

    do {
        const {
            previousElementSibling
        } = parent;
        if (previousElementSibling) {
            if (previousElementSibling.classList.contains('header')) {
                parents.push(parent.previousElementSibling);
            }
        }
        parent = parent.parentElement;
    } while (parent);

    return parents;
}

accordionItemHeaders.forEach(accordionItemHeader => {
    accordionItemHeader.addEventListener("click", event => {
        const parents = getParents(accordionItemHeader);

        accordionItemHeaders.forEach(item => {
            if (item === accordionItemHeader || parents.includes(item)) return;
            item.nextElementSibling.style.maxHeight = "0px";
            item.classList.remove("active");
        });

        const accordionItemBody = accordionItemHeader.nextElementSibling;

        accordionItemHeader.classList.toggle("active");

        const icon = accordionItemHeader.querySelector('.icon')
        icon.classList.toggle("rotate")


        if (accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
          
            let height = 0;
            parents.reverse().forEach(parent => {
                const parentBody = parent.nextElementSibling;
                height += parentBody.scrollHeight;
                parentBody.style.maxHeight = height + accordionItemBody.scrollHeight + 'px';
            })
        } else {
            accordionItemBody.style.maxHeight = 0;
        }

    });
});

accordionItemHeaders[0].click();
