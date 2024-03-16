import React, { useState } from 'react';
import { 
    Dropdown,
    Option,
    Button,
    Dialog,
    DialogSurface,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogTrigger,
    DialogBody } from "@fluentui/react-components";
import { ArrowNextFilled, WarningFilled, LocalLanguageFilled, DarkThemeFilled } from "@fluentui/react-icons";
import { cfg } from "../stores/config";
import { t, intlStore } from "../intl";
import { themeStore } from '../stores/theme';

async function WelcomeOpened() {
    cfg.firstsetting = "open";
}

function Welcome() {
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedTheme, setSelectedTheme] = useState("");
    const [openDialog, setOpenDialog] = React.useState(false);

    function handleLanguageChange(optionText: string){
        const selectedLang = intlStore.languages.find(lang => lang.name === optionText);
        if (selectedLang) {
            setSelectedLanguage(selectedLang.code);
            intlStore.updateLanguage(selectedLang.code);
        }
    };

    function handleThemeChange(optionText: string){
        setSelectedTheme(optionText)
        if (optionText == t.welcome.followMode) {
            themeStore.updateTheme("follow")
        } else if (optionText == t.welcome.darkMode) {
            themeStore.updateTheme("dark")
        } else if (optionText == t.welcome.lightMode) {
            themeStore.updateTheme("light")
        }
    };

    function endSetting() {
        if (selectedLanguage == "" || selectedTheme == "") {
            setOpenDialog(true);
        } else {
            cfg.firstsetting = "end";
            location.reload();
        }
    }

    WelcomeOpened();

    return (
        <>
            <div className="flex justify-center items-center h-[calc(100vh-64px)] select-none cursor-default">
                <div className="flex flex-warp justify-center items-center relative bg-neutral-200 dark:bg-neutral-800 m-5 p-10 w-3/4 h-3/4 rounded-xl">
                    <div className="space-y-10">
                        <p className="text-slate-900 dark:text-slate-100 text-3xl">{t.welcome.welcometext}</p>
                        <span className='text-xl'><LocalLanguageFilled />{t.welcome.language}</span><Dropdown
                            placeholder={t.welcome.selectLang}
                            onOptionSelect={(_event, option) => handleLanguageChange(option.optionText as string)}
                        >
                            {intlStore.languages.map((x) => (
                                <Option key={x.code}>{x.name}</Option>
                            ))}
                        </Dropdown><br />
                        <span className='text-xl'><DarkThemeFilled />{t.welcome.theme}</span><Dropdown
                            placeholder={t.welcome.selectTheme}
                            onOptionSelect={(_event, option) => handleThemeChange(option.optionText as string)}
                        >
                            <Option key="follow">{t.welcome.followMode}</Option>
                            <Option key="dark">{t.welcome.darkMode}</Option>
                            <Option key="light">{t.welcome.lightMode}</Option>
                        </Dropdown>
                    </div>
                    <div className="absolute justify-end items-end right-10 bottom-10">
                        <Button appearance="primary" onClick={() => endSetting()}>{t.welcome.next}<ArrowNextFilled /></Button>
                    </div>
                </div>
            </div>
            <Dialog open={openDialog} onOpenChange={(event, data) => {setOpenDialog(data.open)}}>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle className='text-yellow-500'><WarningFilled />{t.welcome.dialog.warning}</DialogTitle>
                        <DialogContent>
                            {t.welcome.dialog.nochoose}{selectedLanguage === "" && t.welcome.dialog.language}{(selectedLanguage === "" && selectedTheme === "") && t.welcome.dialog.and}{selectedTheme === "" && t.welcome.dialog.theme}{t.welcome.dialog.usedefault}<br /><b>{t.welcome.dialog.defaultsetting}{selectedLanguage === "" && "English"}{selectedLanguage != "" && intlStore.languages.find(lang => lang.code === selectedLanguage).name}, {selectedTheme === "" && t.welcome.followMode}{selectedTheme != "" && selectedTheme}</b>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">{t.welcome.dialog.back}</Button>
                            </DialogTrigger>
                            <Button appearance="primary">{t.welcome.dialog.continue}</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
        </>
    )
}

export default Welcome;