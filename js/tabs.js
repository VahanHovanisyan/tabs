class Tabs {
    constructor(tabsElem, options) {
        let defaultOptions = {
            isChanged: () => { },
            firstTabActive: false,
        };
        this.tabsElem = tabsElem;
        this.options = Object.assign(defaultOptions, options);
        this.tabs = document.querySelector(`[data-tabs="${tabsElem}"]`);
        if (this.tabs) {
            this.tabsList = this.tabs.querySelector('.tabs__list');
            this.tabsButtons = this.tabsList.querySelectorAll('.tabs__button');
            this.tabsPanels = this.tabs.querySelectorAll('.tabs__panel');
        }
        this.init();
        this.events();
    }

    init() {
        this.tabsList.setAttribute('role', 'tablist')
        this.tabsButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('id', `${this.tabsElem}${++index}`)
            button.classList.remove('tabs__button_active');
        })
        this.tabsPanels.forEach((panel, index) => {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', `${this.tabsElem}${++index}`);
            panel.classList.remove('tabs__panel_active');
        })
        if (this.options.firstTabActive) {
            this.tabsButtons[0].classList.add('tabs__button_active')
            this.tabsButtons[0].removeAttribute('tabindex');
            this.tabsButtons[0].setAttribute('aria-selected', true)
            this.tabsPanels[0].classList.add('tabs__panel_active')
        }
    }

    events() {
        this.tabs.addEventListener('click', (e) => {
            // const getAllTabActive = e.target.closest('#getAllTabActive');
            const currentButton = e.target.closest('.tabs__button');
            // if (getAllTabActive) {
            //     this.tabsButtons.forEach((button, index) => {
            //         button.setAttribute('aria-selected', true);
            //         button.classList.add('tabs__button_active');
            //         button.removeAttribute('tabindex');
            //         this.tabsPanels[index++]?.classList.add('tabs__panel_active')
            //     })
            // }
            if (currentButton && !currentButton.classList.contains('tabs__button_active')) {
                this.tabsButtons.forEach((button) => {
                    button.removeAttribute('aria-selected');
                    button.classList.remove('tabs__button_active');
                    button.setAttribute('tabindex', -1);
                })
                currentButton?.classList.add('tabs__button_active');
                currentButton?.focus();
                currentButton?.removeAttribute('tabindex');
                currentButton?.setAttribute('aria-selected', true);
                this.tabsPanels.forEach((panel) => {
                    panel.classList.remove('tabs__panel_active');
                    if (currentButton?.id === panel.getAttribute('aria-labelledby')) {
                        panel.classList.add('tabs__panel_active');
                        this.options.isChanged(this);
                    }
                })
            }
        })
    }

    switchTabs(nextTab, previousTab) {
        nextTab.focus();
        nextTab.removeAttribute('tabindex');
        nextTab.setAttribute('aria-selected', true);

        previousTab.removeAttribute('aria-selected');
        nextTab.setAttribute('tabindex', -1);

        let index = Array.prototype.indexOf.call(this.tabsButtons, nextTab);
        let previousIndex = Array.prototype.indexOf.call(this.tabsButtons, previousTab);
        console.log(index);
        console.log(previousIndex);
        this.tabsPanels[previousIndex].classList.remove('tabs__panel_active');
        this.tabsPanels[index].classList.add('tabs__panel_active');
        this.tabsButtons[previousIndex].classList.remove('tabs__button_active');
        this.tabsButtons[index].classList.add('tabs__button_active')
    }
}