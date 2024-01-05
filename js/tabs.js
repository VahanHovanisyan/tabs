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
        };
        this.init();
        this.events();
    }

    init() {
        this.tabsList.setAttribute('role', 'tablist');
        this.tabsButtons.forEach((button, index) => {
            button.setAttribute('role', 'tab');
            button.setAttribute('id', `${this.tabsElem}${++index}`);
            button.classList.remove('tabs__button_active');
        })
        this.tabsPanels.forEach((panel, index) => {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('aria-labelledby', `${this.tabsElem}${++index}`);
            panel.classList.remove('tabs__panel_active');
        })
        if (this.options.firstTabActive) {
            this.tabsButtons[0].classList.add('tabs__button_active');
            this.tabsButtons[0].setAttribute('aria-selected', true);
            this.tabsPanels[0].classList.add('tabs__panel_active');
        }
    }

    events() {
        this.tabs.addEventListener('click', (e) => {
            this.switchTabs(e)
        })
    }

    switchTabs(e) {
        const currentButton = e.target.closest('.tabs__button');
        if (currentButton && !currentButton.classList.contains('tabs__button_active')) {
            this.tabsButtons.forEach((button) => {
                button.removeAttribute('aria-selected');
                button.classList.remove('tabs__button_active');
            });
            currentButton?.classList.add('tabs__button_active');
            currentButton?.focus();
            currentButton?.setAttribute('aria-selected', true);
            this.tabsPanels.forEach((panel) => {
                panel.classList.remove('tabs__panel_active');
                if (currentButton?.id === panel.getAttribute('aria-labelledby')) {
                    panel.classList.add('tabs__panel_active');
                    this.options.isChanged(this);
                };
            });
        }
    }
}