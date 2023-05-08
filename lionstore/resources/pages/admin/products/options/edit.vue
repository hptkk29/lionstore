<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-row id="create-product">
            
            <!-- Left side -->
            <v-col cols="12" md="7">

                <!-- Title & Description && Handler -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_details')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                        <!-- Translate -->
                        <v-menu bottom :left="!$vuetify.rtl" :right="$vuetify.rtl" origin="center center" :max-height="300" :min-width="150" content-class="elegant-menu" :nudge-bottom="52">
                            <template v-slot:activator="{ on: menu }">
                                <v-tooltip v-model="isTooltipVisible" :left="!$vuetify.rtl" :right="$vuetify.rtl">
                                    <template v-slot:activator="{ on: tooltip }">
                                        <v-btn v-on="{ ...tooltip, ...menu }" icon>
                                            <v-icon :size="18">mdi-translate</v-icon>
                                        </v-btn>
                                    </template>
                                    <span v-text="$t('t_make_sure_translate_fields')"></span>
                                </v-tooltip>
                            </template>
                            <v-list dense avatar class="py-0">

                                <template v-for="(lang, index) in languages">
                                    <v-list-item :key="`language-details-${index}`" v-if="lang.enabled" @click="currentLocale = lang.value" :class="currentLocale === lang.value ? 'indigo accent-3' : ''">
                                        <v-list-item-content>
                                            <v-list-item-title :class="currentLocale === lang.value ? 'white--text' : ''" v-text="lang.text"></v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>

                            </v-list>
                        </v-menu>

                    </v-toolbar>

                    <v-card-text class="px-8 pt-8 pb-6">
                        <v-row>

                            <!-- AR -->
                            <div v-if="currentLocale === 'ar'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_ar"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_ar"
                                        :error="errors.title_ar ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_ar"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- AZ -->
                            <div v-if="currentLocale === 'az'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_az"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_az"
                                        :error="errors.title_az ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_az"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- CN -->
                            <div v-if="currentLocale === 'cn'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_cn"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_cn"
                                        :error="errors.title_cn ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_cn"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- DE -->
                            <div v-if="currentLocale === 'de'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_de"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_de"
                                        :error="errors.title_de ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_de"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- EN -->
                            <div v-if="currentLocale === 'en'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_en"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_en"
                                        :error="errors.title_en ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_en"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- ES -->
                            <div v-if="currentLocale === 'es'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_es"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_es"
                                        :error="errors.title_es ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_es"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- FR -->
                            <div v-if="currentLocale === 'fr'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_fr"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_fr"
                                        :error="errors.title_fr ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_fr"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- HI -->
                            <div v-if="currentLocale === 'hi'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_hi"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_hi"
                                        :error="errors.title_hi ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_hi"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- HU -->
                            <div v-if="currentLocale === 'hu'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_hu"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_hu"
                                        :error="errors.title_hu ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_hu"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- JP -->
                            <div v-if="currentLocale === 'jp'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_jp"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_jp"
                                        :error="errors.title_jp ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_jp"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- NL -->
                            <div v-if="currentLocale === 'nl'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_nl"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_nl"
                                        :error="errors.title_nl ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_nl"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- PO -->
                            <div v-if="currentLocale === 'po'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_po"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_po"
                                        :error="errors.title_po ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_po"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- PT -->
                            <div v-if="currentLocale === 'pt'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_pt"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_pt"
                                        :error="errors.title_pt ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_pt"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- RO -->
                            <div v-if="currentLocale === 'ro'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_ro"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_ro"
                                        :error="errors.title_ro ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_ro"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- RU -->
                            <div v-if="currentLocale === 'ru'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_ru"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_ru"
                                        :error="errors.title_ru ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_ru"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- TH -->
                            <div v-if="currentLocale === 'th'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_th"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_th"
                                        :error="errors.title_th ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_th"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- TR -->
                            <div v-if="currentLocale === 'tr'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_tr"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_tr"
                                        :error="errors.title_tr ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_tr"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                            <!-- UA -->
                            <div v-if="currentLocale === 'ua'">

                                <!-- Title -->
                                <v-col cols="12">
                                    <v-text-field outlined dense
                                        v-model="form.title_ua"
                                        :placeholder="$t('t_enter_product_title')"
                                        append-icon="mdi-shopping"
                                        color="indigo accent-3" 
                                        counter="130"
                                        maxlength="130"
                                        :rules="errors.title_ua"
                                        :error="errors.title_ua ? true : false" />
                                </v-col>

                                <!-- Handle -->
                                <v-col cols="12" class="py-0">
                                    <v-text-field outlined dense
                                        v-model="form.handler" @focus="setHandler"
                                        :placeholder="$t('t_enter_product_handler')"
                                        append-icon="mdi-link-variant"
                                        color="indigo accent-3"
                                        counter="160"
                                        maxlength="160"
                                        :rules="errors.handler"
                                        :error="errors.handler ? true : false" />
                                </v-col>

                                <!-- Description -->
                                <v-col cols="12" class="html-editor">
                                    <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                        <vue-editor v-model="form.description_ua"></vue-editor>
                                    </client-only>
                                </v-col>

                            </div>

                        </v-row>
                    </v-card-text>

                </v-card>

                <!-- Categories -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_categories')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                        <!-- Translate -->
                        <v-btn icon>
                            <v-icon :size="18">mdi-translate</v-icon>
                        </v-btn>

                    </v-toolbar>

                    <v-card-text class="px-8 pt-8 pb-6">
                        <v-row>

                            <!-- Parent categories -->
                            <v-col cols="12">
                                <v-autocomplete dense outlined
                                    v-model="form.category"
                                    @change="fetchSubcategories"
                                    :hide-details="!errors.category"
                                    :items="categories"
                                    :item-text="item => JSON.parse(item.translation.title)[$store.state.settings.default_language]"
                                    item-value="id"
                                    :placeholder="$t('t_choose_parent_category')"
                                    color="indigo accent-3" 
                                    :rules="errors.category"
                                    :error="errors.category ? true : false" />
                            </v-col>

                            <!-- Subcategories -->
                            <v-col cols="12">
                                <v-autocomplete dense outlined
                                    v-model="form.subcategory"
                                    :disabled="subcategories.length === 0"
                                    @change="fetchChildcategories"
                                    :hide-details="!errors.subcategory"
                                    :items="subcategories"
                                    :item-text="item => JSON.parse(item.translation.title)[$store.state.settings.default_language]"
                                    item-value="id"
                                    :placeholder="$t('t_choose_subcategory')"
                                    color="indigo accent-3" 
                                    :rules="errors.subcategory"
                                    :error="errors.subcategory ? true : false" />
                            </v-col>

                            <!-- Childcategories -->
                            <v-col cols="12">
                                <v-autocomplete dense outlined
                                    v-model="form.childcategory"
                                    :disabled="childcategories.length === 0"
                                    :hide-details="!errors.childcategory"
                                    :items="childcategories"
                                    :item-text="item => JSON.parse(item.translation.title)[$store.state.settings.default_language]"
                                    item-value="id"
                                    :placeholder="$t('t_choose_childcategory')"
                                    color="indigo accent-3" 
                                    :rules="errors.childcategory"
                                    :error="errors.childcategory ? true : false" />
                            </v-col>

                        </v-row>
                    </v-card-text>

                </v-card>

                <!-- Price -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_pricing')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-6">
                        <v-row>

                            <!-- Price -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.price"
                                    :hide-details="!errors.price"
                                    :placeholder="$t('t_enter_product_price')"
                                    color="indigo accent-3" 
                                    :suffix="currencySymbol"
                                    :rules="errors.price"
                                    :error="errors.price ? true : false" />
                            </v-col>

                            <!-- Discount type -->
                            <v-col cols="12" md="6">
                                <v-select outlined dense hide-details
                                    v-model="form.discount_type"
                                    :placeholder="$t('t_choose_discount_type')"
                                    :items="[ { text: $t('t_money_discount'), value: 'money' }, { text: $t('t_percentage_discount'), value: 'percentage' } ]"
                                    item-value="value"
                                    item-text="text"
                                    color="indigo accent-3" />
                            </v-col>

                            <!-- Discount value -->
                            <v-col cols="12" md="6">
                                <v-text-field outlined dense
                                    v-model="form.discount_value"
                                    :hide-details="!errors.discount_value"
                                    :placeholder="$t('t_enter_discount_value')"
                                    color="indigo accent-3"
                                    append-icon="mdi-sale"
                                    :rules="errors.discount_value"
                                    :error="errors.discount_value ? true : false" />
                            </v-col>

                            <!-- Purchase unit -->
                            <v-col cols="12">
                                <v-text-field dense outlined
                                    v-model="form.purchase_unit"
                                    :hide-details="!errors.purchase_unit"
                                    :placeholder="$t('t_enter_purchase_unit')"
                                    append-icon="mdi-cart"
                                    color="indigo accent-3" 
                                    :rules="errors.purchase_unit"
                                    :error="errors.purchase_unit ? true : false" />
                            </v-col>

                            <!-- Quantity -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.stock"
                                    :hide-details="!errors.stock"
                                    :placeholder="$t('t_enter_stock')"
                                    color="indigo accent-3"
                                    type="number"
                                    min="1"
                                    :rules="errors.stock"
                                    :error="errors.stock ? true : false" />
                            </v-col>
                            
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Variants -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4" :class="productHasVariants ? '' : 'hide-bottom-border'">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_product_variants')"></v-toolbar-title>

                        <v-spacer></v-spacer>

                        <!-- Product has variants? -->
                        <v-btn icon v-if="!productHasVariants" @click="productHasVariants = true">
                            <v-icon :size="18">mdi-chevron-down</v-icon>
                        </v-btn>
                        <v-btn icon v-else @click="productHasVariants = false">
                            <v-icon :size="18">mdi-chevron-up</v-icon>
                        </v-btn>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-6" v-if="productHasVariants">

                        <!-- Add variants -->
                        <v-row>

                            <!-- Variant name -->
                            <v-col cols="12" md="6">
                                <v-text-field outlined dense hide-details
                                    v-model="newVariantName"
                                    v-on:keyup.enter="newVariantName = matches[0]"
                                    ref="variantName"
                                    :placeholder="$t('t_enter_variant_name')"
                                    color="indigo accent-3" />
                            </v-col>

                            <!-- Variant type -->
                            <v-col cols="12" md="6">
                                <v-select outlined dense hide-details
                                    v-model="newVariantType"
                                    :placeholder="$t('t_select_variant_type')"
                                    :items="variantsTypes"
                                    item-value="value"
                                    item-text="text"
                                    color="indigo accent-3" />
                            </v-col>

                            <!-- Colors buttons -->
                            <v-col cols="12" class="product-color-variants-btns"  v-if="newVariantType === 'color'">

                                <template v-for="(color, index) in newProductColors">
                                    <div :key="index" class="pcv-container">
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn
                                                    v-model="color.hex"
                                                    :color="color.hex"
                                                    dark
                                                    v-on="on"
                                                    depressed
                                                    fab
                                                    :height="30"
                                                    :width="30"
                                                    ></v-btn>
                                            </template>
                                            <v-color-picker
                                                :value="color.hex"
                                                v-model="color.hex"
                                                hide-inputs 
                                                show-swatches
                                                class="mx-auto"
                                                ></v-color-picker>
                                        </v-menu>
                                        <v-icon @click="removeColor(index)">mdi-close</v-icon>
                                    </div>
                                </template>
                                <div class="pvc-add-color">
                                    <v-icon @click="addProductColorOption()">mdi-plus</v-icon>
                                </div>

                            </v-col>

                            <!-- Variant values -->
                            <v-col cols="12" v-if="newVariantType === 'radio'">
                                <v-text-field outlined dense persistent-hint
                                    v-model="newVariantValue"
                                    v-on:keyup.enter="saveNewVariant"
                                    :placeholder="$t('t_enter_variant_value')"
                                    :hint="$t('t_separate_with_comma_variant')"
                                    color="indigo accent-3">
                                </v-text-field>
                            </v-col>

                            <!-- Add variant -->
                            <v-col cols="12" v-if="newVariantName && newVariantType">
                                <v-btn block depressed rounded dark color="indigo accent-3" class="fs-11 font-weight-medium" @click="saveColorsOptions" v-if="newVariantType === 'color'" v-text="$t('t_add_variant')"></v-btn>
                                <v-btn block depressed rounded dark color="indigo accent-3" class="fs-11 font-weight-medium" @click="saveNewVariant" v-else v-text="$t('t_add_variant')"></v-btn>
                            </v-col>
                            
                        </v-row>

                        <v-divider class="my-5" v-if="options.length"></v-divider>

                        <!-- Edit variants -->
                        <template v-for="(option, index) in options">
                            <v-row :key="index" v-if="options.length">

                                    <!-- Variant name -->
                                    <v-col cols="3">
                                        <v-text-field outlined dense hide-details
                                            v-model="options[index].name"
                                            :placeholder="$t('t_enter_variant_name')"
                                            color="indigo accent-3" />
                                    </v-col>

                                    <!-- Variant values -->
                                    <v-col cols="7">
                                        
                                        <!-- Color buttons -->
                                        <div v-if="options[index].type === 'color'">
                                            <template v-for="(color, i) in options[index].value">
                                                <v-menu offset-y :key="i">
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn
                                                            :color="color.color"
                                                            dark
                                                            v-on="on"
                                                            depressed
                                                            fab
                                                            :height="40"
                                                            :width="40"
                                                            class="mx-2"
                                                            >
                                                        </v-btn>
                                                    </template>
                                                    <v-color-picker
                                                        :value="options[index].value[i].color"
                                                        v-model="options[index].value[i].color"
                                                        hide-canvas 
                                                        hide-inputs 
                                                        show-swatches
                                                        class="mx-auto"
                                                        ></v-color-picker>
                                                </v-menu>
                                            </template>
                                        </div>
                                        
                                        <v-text-field v-else outlined dense hide-details
                                            v-model="options[index].value"
                                            :placeholder="$t('t_enter_variant_value')"
                                            color="indigo accent-3" />
                                    </v-col>

                                    <v-col cols="2">
                                        <v-btn dark depressed block color="error" @click.prevent="removeVariant(index)">
                                            <v-icon>mdi-delete</v-icon>
                                        </v-btn>
                                    </v-col>

                            </v-row>
                        </template>

                        <!-- Variants list -->
                        <v-simple-table class="mt-6" v-if="options.length">
                            <template v-slot:default>
                                <thead style="background-color: #f8f8f8">
                                    <tr>
                                        <th :class="$vuetify.rtl ? 'text-right' : 'text-left'" class="ff-default fs-10 font-weight-bold" v-text="$t('t_variant')"></th>
                                        <th :class="$vuetify.rtl ? 'text-right' : 'text-left'" class="ff-default fs-10 font-weight-bold" v-text="$t('t_price')"></th>
                                        <th :class="$vuetify.rtl ? 'text-right' : 'text-left'" class="ff-default fs-10 font-weight-bold" v-text="$t('t_stock')"></th>
                                        <th :class="$vuetify.rtl ? 'text-right' : 'text-left'" class="ff-default fs-10 font-weight-bold" v-text="$t('t_sku_short')"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    <template v-for="(variant, index) in variantsJSON">
                                        <tr :key="index">

                                            <!-- Name -->
                                            <td :class="$vuetify.rtl ? 'text-right' : 'text-left'">
                                                <input type="hidden" :name="'variant['+index+'][attributes]'" :value='JSON.stringify(variant)'/>
                                                <template v-for="(value, index) in variant">
                                                    <span class="fs-11 font-weight-medium"  :key="index" v-if="value.attributegroup.type === 'color'" :style="`color: ${value.value}`">
                                                        <v-btn fab depressed :height="13" :width="13" :color="value.value" class="mx-1" style="margin-top: -2px;"></v-btn>
                                                    </span>
                                                    <span class="fs-11 font-weight-medium"  :key="index" v-else>{{value.value}} </span>
                                                </template>
                                            </td>

                                            <!-- Price -->
                                            <td>
                                                <v-text-field outlined dense hide-details
                                                    v-model="variantGroupPrices[index]"
                                                    placeholder="0.00"
                                                    :suffix="currencySymbol"
                                                    color="indigo accent-3"
                                                    class="py-2"
                                                ></v-text-field>
                                            </td>

                                            <!-- Stock -->
                                            <td>
                                                <v-text-field outlined dense hide-details
                                                    v-model="variantGroupStock[index]"
                                                    :placeholder="$t('t_stock')"
                                                    color="indigo accent-3"
                                                    class="py-2"
                                                    type="number"
                                                ></v-text-field>
                                            </td>

                                            <!-- SKU -->
                                            <td>
                                                <v-text-field outlined dense hide-details
                                                    v-model="variantGroupSku[index]"
                                                    :placeholder="$t('t_sku_short')"
                                                    color="indigo accent-3"
                                                    class="py-2"
                                                ></v-text-field>
                                            </td>

                                        </tr>
                                    </template>
                                </tbody>
                            </template>
                        </v-simple-table>

                    </v-card-text>
                </v-card>

                <!-- Video & Main image -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_main_media')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-6">
                        <v-row>

                            <!-- Main image -->
                            <v-col cols="12">
                                <v-file-input outlined dense
                                    @change="mainPhoto"
                                    :hide-details="!errors.main_photo"
                                    ref="mainPhoto"
                                    :placeholder="$t('t_upload_main_product_image')"
                                    append-icon="mdi-camera"
                                    prepend-icon=""
                                    accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                    color="indigo accent-3"
                                    :rules="errors.main_photo"
                                    :error="errors.main_photo ? true : false"></v-file-input>
                            </v-col>

                            <!-- Video provider -->
                            <v-col cols="12" md="6">
                                <v-select dense outlined
                                    v-model="form.video_provider"
                                    :hide-details="!errors.video_provider"
                                    :items="[{ text: $t('t_youtube'), value: 'youtube' }, { text: $t('t_vimeo'), value: 'vimeo' }, { text: $t('t_facebook'), value: 'facebook' }]"
                                    item-text="text"
                                    item-value="value"
                                    :placeholder="$t('t_choose_video_provider')"
                                    color="indigo accent-3" 
                                    :rules="errors.video_provider"
                                    :error="errors.video_provider ? true : false" />
                            </v-col>
                            
                            <!-- Video link -->
                            <v-col cols="12" md="6">
                                <v-text-field outlined dense
                                    v-model="form.video_link"
                                    :hide-details="!errors.video_link"
                                    :placeholder="$t('t_enter_full_video_link')"
                                    :append-icon="form.video_provider === 'youtube' ? 'mdi-youtube' : form.video_provider === 'vimeo' ? 'mdi-vimeo' : form.video_provider === 'facebook' ? 'mdi-facebook' : 'mdi-link'"
                                    color="indigo accent-3" 
                                    :rules="errors.video_link"
                                    :error="errors.video_link ? true : false" />
                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Features -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_features')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-6">
                        <v-row>

                            <!-- Product Brand -->
                            <v-col lg="12">
                                <v-autocomplete dense outlined
                                    v-model="form.brand"
                                    :hide-details="!errors.brand"
                                    :items="brands"
                                    :item-text="item => JSON.parse(item.translation.name)[$i18n.locale]"
                                    item-value="id"
                                    :placeholder="$t('t_choose_product_brand')"
                                    color="indigo accent-3" 
                                    :rules="errors.brand"
                                    :error="errors.brand ? true : false">
                                    <template v-slot:item="data">
                                        <v-list-item-avatar>
                                            <img :src="`/uploads/${ data.item.logo.file_folder }/${ data.item.logo.uid }.webp`">
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title class="ff-default fs-12 font-weight-medium" v-text="JSON.parse(data.item.translation.name)[$i18n.locale]"></v-list-item-title>
                                            <v-list-item-subtitle class="ff-roboto fs-10" style="max-width: 200px;" v-text="data.item.translation.description"></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <!-- Product status -->
                            <v-col cols="12">
                                <v-select dense outlined
                                    v-model="form.status"
                                    :hide-details="!errors.status"
                                    :items="[{ text: $t('t_active'), value: 1 }, { text: $t('t_inactive'), value: 0 }]"
                                    item-text="text"
                                    item-value="value"
                                    :placeholder="$t('t_choose_product_status')"
                                    color="indigo accent-3" 
                                    :rules="errors.status"
                                    :error="errors.status ? true : false" />
                            </v-col>

                            <!-- Barcode -->
                            <v-col cols="12">
                                <v-text-field dense outlined
                                    v-model="form.barcode"
                                    :hide-details="!errors.barcode"
                                    :placeholder="$t('t_enter_product_barcode')"
                                    append-icon="mdi-barcode"
                                    color="indigo accent-3" 
                                    :rules="errors.barcode"
                                    :error="errors.barcode ? true : false" />
                            </v-col>
                            
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Shipping -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_shipping')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-6">
                        <v-row>

                            <!-- Shipping type -->
                            <v-col cols="12" :md="form.shipping_type === 'free' ? 12 : '6'">
                                <v-select outlined dense hide-details
                                    v-model="form.shipping_type"
                                    :placeholder="$t('t_choose_shipping_type')"
                                    :items="[{ text: $t('t_free_shipping'), value: 'free' }, { text: $t('t_flat_shipping'), value: 'flat' }]"
                                    item-value="value"
                                    item-text="text"
                                    color="indigo accent-3" />
                            </v-col>

                            <!-- Shipping cost -->
                            <v-col cols="12" md="6" v-if="form.shipping_type === 'flat'">
                                <v-text-field outlined dense
                                    v-model="form.shipping_cost"
                                    :hide-details="!errors.shipping_cost"
                                    :placeholder="$t('t_enter_shipping_cost')"
                                    color="indigo accent-3"
                                    :suffix="currencySymbol"
                                    :rules="errors.shipping_cost"
                                    :error="errors.shipping_cost ? true : false" />
                            </v-col>

                            <!-- Tax type -->
                            <v-col cols="12" md="6">
                                <v-text-field dense outlined
                                    v-model="form.tax_type"
                                    :hide-details="!errors.tax_type"
                                    :placeholder="$t('t_enter_tax_name')"
                                    append-icon="mdi-calculator-variant"
                                    color="indigo accent-3" 
                                    :rules="errors.tax_type"
                                    :error="errors.tax_type ? true : false" />
                            </v-col>

                            <!-- Tax value -->
                            <v-col cols="12" md="6">
                                <v-text-field dense outlined
                                    v-model="form.tax_value"
                                    :hide-details="!errors.tax_value"
                                    :placeholder="$t('t_enter_tax_value')"
                                    :suffix="currencySymbol"
                                    color="indigo accent-3" 
                                    :rules="errors.tax_value"
                                    :error="errors.tax_value ? true : false" />
                            </v-col>
                            
                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Seo -->
                <v-card class="c-card mb-8">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_seo_preview')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-6">
                        <v-row>

                            <!-- Preview -->
                            <v-col cols="12" v-if="seoReady">
                                <div class="seo-preview-favicon">
                                    <img :src="favicon" />
                                    <span v-text="$clientIndex(`product/${form.handler}`)"></span>
                                </div>
                                <div class="seo-preview-title">
                                    <h1 v-text="`${ form.seo_title } ${ $store.state.settings.title_separator } ${ $store.state.settings.site_title }`"></h1>
                                </div>
                                <div class="seo-preview-description">
                                    <p v-text="form.seo_description"></p>
                                </div>
                                <div class="seo-preview-footer">
                                    <span class="seo-preview-rating">5.0</span>
                                    <div class="seo-preview-stars">
                                        <v-icon color="#ff9e0c" :size="13">mdi-star</v-icon>
                                        <v-icon color="#ff9e0c" :size="13">mdi-star</v-icon>
                                        <v-icon color="#ff9e0c" :size="13">mdi-star</v-icon>
                                        <v-icon color="#ff9e0c" :size="13">mdi-star</v-icon>
                                        <v-icon color="#ff9e0c" :size="13">mdi-star</v-icon>
                                    </div>
                                    <span class="seo-preview-reviews">(152)</span>
                                    <span class="seo-preview-dot">•</span>
                                    <span class="seo-preview-price" v-text="$formatMoney(form.price)"></span>
                                    <span class="seo-preview-dot">•</span>
                                    <span class="seo-preview-stock">In Stock</span>
                                </div>
                            </v-col>

                            <v-col cols="12" v-if="seoReady">
                                <v-divider />
                            </v-col>

                            <!-- SEO Title -->
                            <v-col cols="12">
                                <v-text-field outlined dense
                                    v-model="form.seo_title"
                                    :hide-details="!errors.seo_title"
                                    placeholder="Enter seo title"
                                    color="indigo accent-3"
                                    :rules="errors.seo_title"
                                    :error="errors.seo_title ? true : false" />
                            </v-col>

                            <!-- SEO Description -->
                            <v-col cols="12">
                                <v-textarea outlined dense
                                    v-model="form.seo_description"
                                    :hide-details="!errors.seo_description"
                                    placeholder="Enter seo description"
                                    color="indigo accent-3"
                                    :rules="errors.seo_description"
                                    :error="errors.seo_description ? true : false" />
                            </v-col>
                            
                        </v-row>
                    </v-card-text>
                </v-card>

            </v-col>

            <!-- Right side -->
            <v-col cols="12" md="5">

                <!-- Gallery -->
                <v-card class="c-card mb-8 px-0 pb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_product_gallery')"></v-toolbar-title>

                        <v-spacer />

                        <span style="font-size: 12px; color: #2572ff; font-weight: 500; letter-spacing: .5px; cursor: pointer;" v-text="$t('t_update_photos')" @click="updatePhotos = !updatePhotos"></span>

                    </v-toolbar>
                    <v-card-text class="px-0 pt-4 pb-0" v-show="updatePhotos">
                        <client-only>
                            <Fileuploader ref="uploader" name="gallery" limit="50" @options="getFileuploaderOptions"></Fileuploader>
                        </client-only>

                        <!-- Product zoomer -->
                        <v-row>
                            <v-col cols="12" class="px-10 pt-8 pb-6">
                                <v-switch :true-value="1" :false-value="0" inset dense v-model="form.is_product_zoomer" color="indigo accent-3" :ripple="false" hide-details class="mt-0 fs-12 font-weight-medium" :label="$t('t_enable_product_images_zoomer')">
                                </v-switch>
                            </v-col>
                        </v-row>

                    </v-card-text>
                </v-card>

                <!-- Tags -->
                <v-card class="c-card mb-8 px-0 pb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_tags')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-4">
                        <v-row>
                            
                            <!-- tags -->
                            <v-col lg="12" class="tags-input">
                                <v-combobox multiple chips outlined dense
                                    v-model="form.tags"
                                    :hide-details="!errors.tags"
                                    :placeholder="$t('t_enter_tags')"
                                    append-icon
                                    small-chips
                                    deletable-chips
                                    class="tag-input"
                                    color="indigo accent-3" 
                                    :rules="errors.tags"
                                    :error="errors.tags ? true : false" />
                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Optional details -->
                <v-card class="c-card mb-8 px-0 pb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_optional_details')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-4">
                        <v-row>
                            
                            <!-- Original source details -->
                            <v-col lg="12">
                                <v-textarea outlined dense
                                    v-model="form.original_source"
                                    :hide-details="!errors.original_source"
                                    :placeholder="$t('t_enter_product_optional_details')"
                                    color="indigo accent-3" 
                                    :rules="errors.original_source"
                                    :error="errors.original_source ? true : false" />
                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>

                <!-- Create -->
                <v-card class="c-card mb-8 px-0 pb-4">
                    <v-toolbar flat class="card-toolbar px-4">

                        <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_update_product')"></v-toolbar-title>

                    </v-toolbar>
                    <v-card-text class="px-8 pt-8 pb-4">
                        <v-row>
                            
                            <!-- Actions -->
                            <v-col lg="12">
                                <v-radio-group v-model="form.action" :mandatory="false" class="mt-0">

                                    <!-- Stay on this page -->
                                    <v-radio color="indigo accent-3" value="stay">
                                        <template v-slot:label>
                                            <span class="ff-default fs-11 font-weight-bold" v-text="$t('t_stay_on_this_page')"></span>
                                        </template>
                                    </v-radio>

                                    <!-- Open this -->
                                    <v-radio color="indigo accent-3" value="open">
                                        <template v-slot:label>
                                            <span class="ff-default fs-11 font-weight-bold" v-text="$t('t_open_this_product')"></span>
                                        </template>
                                    </v-radio>

                                    <!-- Go to products -->
                                    <v-radio color="indigo accent-3" value="go">
                                        <template v-slot:label>
                                            <span class="ff-default fs-11 font-weight-bold" v-text="$t('t_go_to_products')"></span>
                                        </template>
                                    </v-radio>
                                    
                                </v-radio-group>
                            </v-col>

                            <!-- Submit -->
                            <v-col cols="12">
                                <v-btn rounded color="indigo accent-3" depressed block @click="update" :loading="loading" :disabled="loading" :dark="!loading">
                                    <span class="fs-11 font-weight-medium" v-t="'t_update'" v-if="!loading"></span>
                                    <template v-slot:loader>
                                        <v-progress-circular
                                            :width="3"
                                            :size="10"
                                            color="#6c6c6c"
                                            indeterminate />
                                    </template>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-card-text>
                </v-card>

            </v-col>

        </v-row>

    </v-container>
</template>

<script>
export default {
    
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

    middleware: 'admin',

    async asyncData({ $axios, params, app }) {
		// Send request to server
        let response = await $axios.post('dashboard/products/options/edit', { id: params.id })

        // Decode title
        const title  = JSON.parse(response.data.product.translation.title)

        return {
            // Form inputs
            form: {
                id             : response.data.product.id,
                title_ar       : title.ar,
                title_az       : title.az,
                title_cn       : title.cn,
                title_de       : title.de,
                title_en       : title.en,
                title_es       : title.es,
                title_fr       : title.fr,
                title_hi       : title.hi,
                title_hu       : title.hu,
                title_jp       : title.jp,
                title_nl       : title.nl,
                title_po       : title.po,
                title_pt       : title.pt,
                title_ro       : title.ro,
                title_ru       : title.ru,
                title_th       : title.th,
                title_tr       : title.tr,
                title_ua       : title.ua,
                description_ar : response.data.product.translation.description_ar,
                description_az : response.data.product.translation.description_az,
                description_cn : response.data.product.translation.description_cn,
                description_de : response.data.product.translation.description_de,
                description_en : response.data.product.translation.description_en,
                description_es : response.data.product.translation.description_es,
                description_fr : response.data.product.translation.description_fr,
                description_hi : response.data.product.translation.description_hi,
                description_hu : response.data.product.translation.description_hu,
                description_jp : response.data.product.translation.description_jp,
                description_nl : response.data.product.translation.description_nl,
                description_po : response.data.product.translation.description_po,
                description_pt : response.data.product.translation.description_pt,
                description_ro : response.data.product.translation.description_ro,
                description_ru : response.data.product.translation.description_ru,
                description_th : response.data.product.translation.description_th,
                description_tr : response.data.product.translation.description_tr,
                description_ua : response.data.product.translation.description_ua,
                handler        : response.data.product.handler,
                category       : response.data.product.category_id,
                subcategory    : response.data.product.subcategory_id,
                childcategory  : response.data.product.childcategory_id,
                tags           : response.data.product.tags ? response.data.product.tags.split(',') : '',
                original_source: response.data.product.original_source,
                action         : 'stay',
                seo_title      : response.data.product.seo ? response.data.product.seo.title : '',
                seo_description: response.data.product.seo ? response.data.product.seo.description : '',
                brand          : response.data.product.brand_id,
                status         : response.data.product.is_active,
                barcode        : response.data.product.product_barcode,
                shipping_type  : response.data.product.shipping_type,
                shipping_cost  : response.data.product.shipping_cost,
                tax_type       : response.data.product.tax_type,
                tax_value      : response.data.product.tax_value,
                video_provider : response.data.product.video_provider,
                video_link     : response.data.product.video_link,
                main_photo     : '',
                price          : response.data.product.price,
                discount_type  : response.data.product.discount_type,
                discount_value : response.data.product.discount_value,
                purchase_unit  : response.data.product.purchase_unit,
                stock          : response.data.product.stock
            },
            product           : response.data.product,
            categories        : response.data.categories,
            subcategories     : response.data.subcategories,
            childcategories   : response.data.childcategories,
            brands            : response.data.brands,
            productHasVariants: response.data.product.variants.length > 0 ? true: false,
            is_product_zoomer : response.data.product.is_product_zoomer
        }
    },

    data() {
        return {
            newVariantName    : '',
            newVariantValue   : '',
            newVariantType    : '',
            options           : [],
            variantGroupPrices: [],
            variantGroupStock : [],
            variantGroupSku   : [],
            newProductColors  : [
                {
                    hex: '#000'
                }
            ],
            currentLocale   : this.$store.state.settings.default_language,
            errors          : [],
            loading         : false,
            isTooltipVisible: true,
            updatePhotos    : false
        }
    },

    components: {
        Fileuploader: () => import('~/components/utils/uploader')
    },

    head() {
        return {

            // Title
            title: this.$t('t_edit_product'),

            // Set links tags
            link: [
                { rel: 'stylesheet', href: '/plugins/uploader/dist/font/font-fileuploader.css' },
                { rel: 'stylesheet', href: '/plugins/uploader/dist/jquery.fileuploader.min.css' },
                { rel: 'stylesheet', href: '/plugins/uploader/src/drag-drop/css/jquery.fileuploader-theme-dragdrop.css' },
                
            ],

            // Set scripts
            script: [
                { hid: "uploader-jquery", src: '/plugins/uploader/src/drag-drop/js/jquery-3.2.1.min.js' },
                { hid: "uploader-plugin", src: '/plugins/uploader/dist/jquery.fileuploader.min.js' }
            ]
        }
    },

    watch: {
        'form.handler': {
            handler: function (val, oldVal) {
                // Set new value
                const value = val
                                .replace(/\s+/g, '-')
                                .replace("'", '')
                                .replace('/', '-')
                                .replace('"', '')
                                .replace('.', '')
                                .replace('(', '')
                                .replace(')', '')
                                .replace('&', '')
                                .replace('_', '-')
                // Change value
                this.form.handler = value.toLowerCase();
            },
            deep: true
        },

        newVariantValue: {
            handler: function (val, oldVal) {
                // Set new value
                const value          = val.replace(", ", '')
                // Change value
                this.newVariantValue = value
            },
            deep: true
        }
    },

    computed: {

        // Avaialbale languages
        languages() {
            // Get settings
            const settings = this.$store.state.settings.languages

            return [
                {
                    index  : 0,
                    value  : 'ar',
                    text   : this.$t('t_arabic'),
                    enabled: settings.ar ? true : false
                },
                {
                    index  : 1,
                    value  : 'az',
                    text   : this.$t('t_azerbaijani'),
                    enabled: settings.az ? true : false
                },
                {
                    index  : 2,
                    value  : 'cn',
                    text   : this.$t('t_chinese'),
                    enabled: settings.cn ? true : false
                },
                {
                    index  : 3,
                    value  : 'de',
                    text   : this.$t('t_german'),
                    enabled: settings.de ? true : false
                },
                {
                    index  : 4,
                    value  : 'en',
                    text   : this.$t('t_english'),
                    enabled: settings.en ? true : false
                },
                {
                    index  : 5,
                    value  : 'es',
                    text   : this.$t('t_spanish'),
                    enabled: settings.es ? true : false
                },
                {
                    index  : 6,
                    value  : 'fr',
                    text   : this.$t('t_french'),
                    enabled: settings.fr ? true : false
                },
                {
                    index  : 7,
                    value  : 'hi',
                    text   : this.$t('t_hindi'),
                    enabled: settings.hi ? true : false
                },
                {
                    index  : 8,
                    value  : 'hu',
                    text   : this.$t('t_hungarian'),
                    enabled: settings.hu ? true : false
                },
                {
                    index  : 9,
                    value  : 'jp',
                    text   : this.$t('t_japanese'),
                    enabled: settings.jp ? true : false
                },
                {
                    index  : 10,
                    value  : 'nl',
                    text   : this.$t('t_dutch'),
                    enabled: settings.nl ? true : false
                },
                {
                    index  : 11,
                    value  : 'po',
                    text   : this.$t('t_polish'),
                    enabled: settings.po ? true : false
                },
                {
                    index  : 12,
                    value  : 'pt',
                    text   : this.$t('t_portuguese'),
                    enabled: settings.pt ? true : false
                },
                {
                    index  : 13,
                    value  : 'ro',
                    text   : this.$t('t_romanian'),
                    enabled: settings.ro ? true : false
                },
                {
                    index  : 14,
                    value  : 'ru',
                    text   : this.$t('t_russian'),
                    enabled: settings.ru ? true : false
                },
                {
                    index  : 15,
                    value  : 'th',
                    text   : this.$t('t_thai'),
                    enabled: settings.th ? true : false
                },
                {
                    index  : 16,
                    value  : 'tr',
                    text   : this.$t('t_turkish'),
                    enabled: settings.tr ? true : false
                },
                {
                    index  : 17,
                    value  : 'ua',
                    text   : this.$t('t_ukrainian'),
                    enabled: settings.ua ? true : false
                },
            ]
        },

        // Get website favicon
        favicon() {

            // Check if site has a custom favicon
            if (this.$store.state.settings.favicon) {
                
                // Return favicon
                return `/uploads/${ this.$store.state.settings.favicon.file_folder }/${ this.$store.state.settings.favicon.uid }.webp`

            } else {

                // Return default favicon
                return '/images/default/icon.svg'
            }

        },

        // Check if seo form filled to show preview
        seoReady() {

            // Check if form filled
            if (this.form.handler && this.form.seo_title && this.form.seo_description) {
                return true
            } else {
                return false
            }

        },

        // Get currency symbol
        currencySymbol() {

            // Find selected currency
            return this.$store.state.settings.currency.symbol_native

        },

        // Variants types
        variantsTypes() {
            return [
                { text: this.$t('t_radio_buttons'), value: 'radio' },
                { text: this.$t('t_color_based_buttons'), value: 'color' },
            ]
        },

        // Variant matches
        matches: function () {
            if (this.newVariantName === "") {
                return [];
            }
            return this.attributes.filter((str) => {
                return str.indexOf(this.newVariantName.toLowerCase()) >= 0;
            });
        },

        // Convert to array
        allArrays: function() {
            if (this.options.length) {
                var allArrays = [];

                for (var option of this.options) {

                    let fixedOptions = [];

                    if (option.type === 'color') {
                        option.value.forEach(function(el){
                            fixedOptions.push(el.color)
                        });
                    }else{

                        let options = option.value.split(',');
                        options.forEach(function(el){
                        fixedOptions.push(el.replace(/^\s+|\s+$/g,''));
                        });

                    }
                    allArrays.push(fixedOptions);
                }
                return allArrays;
            }
        },

        // Convert to json
        variantsJSON: function() {
            if (this.options.length) {
                let vm = this

                // Generate JSON of combinations for submit
                var helperOptions = this.options;
                function cartesian(arg) {
                    var r = [],  max = arg.length-1;
                    function helper(arr, i) {
                        for (var j=0, l=arg[i].length; j<l; j++) {
                            var a = arr.slice(0); // clone arr
                            a.push(arg[i][j]);
                            if (i==max)
                                r.push(a);
                            else
                                helper(a, i+1);
                        }
                    }
                    helper([], 0);

                    var resultArr = [];
                    for (let i = 0; i < r.length; i++){
                        let step = [];
                        for (let y = 0; y < r[0].length; y++){
                            step.push({
                                attributegroup: {
                                    name: helperOptions[y].name,
                                    type: helperOptions[y].type,
                                },
                                value: r[i][y],
                                price: vm.variantGroupPrices[i],
                                stock: vm.variantGroupStock[i],
                                sku  : vm.variantGroupSku[i]
                            });
                        }
                        resultArr.push(step);
                    }
                    return resultArr;
                }
                return cartesian(this.allArrays);

            }
        }

    },

    methods: {

        // Set handler based on title by default
        setHandler(event) {
            // Check if handler exmpty
            if (!this.form.handler && this.form[`title_${ this.$store.state.settings.default_language }`]) {
                this.form.handler = this.form[`title_${ this.$store.state.settings.default_language }`]
            }
        },

        // Fetch subcategories
        async fetchSubcategories() {

            // Start loading spinner
            this.loading = true

            // Send request
            await this.$axios
                        .post('dashboard/fetch/subcategories', { id: this.form.category })
                        .then(response => {

                            // Check if this category has subcategories or no
                            if (response.data.length === 0) {
                                this.$message(this.$t('t_select_cat_has_no_subs'), 'checkbox-blank-off', 'info')
                            } else {
                                // Category has subcategories
                                this.subcategories = response.data
                            }
                        })
                        .catch(error => {
                            // Show error toast
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                        })
                        .finally(() => {
                            // Stop loading
                            this.loading = false
                        })


        },

        // Fetch childcategories
        async fetchChildcategories() {

            // Start loading spinner
            this.loading = true

            // Send request
            await this.$axios
                        .post('dashboard/fetch/childcategories', { id: this.form.subcategory })
                        .then(response => {

                            // Check if this category has childcategories or no
                            if (response.data.length === 0) {
                                this.$message(this.$t('t_select_sub_has_no_childs'), 'checkbox-blank-off', 'info')
                            } else {
                                // Category has childcategories
                                this.childcategories = response.data
                            }
                        })
                        .catch(error => {
                            // Show error toast
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                        })
                        .finally(() => {
                            // Stop loading
                            this.loading = false
                        })


        },

        // Config uploader
        getFileuploaderOptions(cmp) {
            let name = cmp.name

            cmp.options = {
                changeInput: '<div class="fileuploader-input">' +
                        '<div class="fileuploader-input-inner">' +
                            '<div class="fileuploader-icon-main"></div>' +
                            '<h3 class="fileuploader-input-caption"><span>${captions.feedback}</span></h3>' +
                            '<p>${captions.or}</p>' +
                            '<button type="button" class="fileuploader-input-button"><span>${captions.button}</span></button>' +
                        '</div>' +
                    '</div>',
                theme: 'dragdrop',
                captions: 'en',
                addMore: true
            }
        },

        // Set main product image
        mainPhoto(file) {
            this.form.main_photo = file
        },

        // Add product color option
        addProductColorOption() {
            const color = {
                hex: '#000'
            }

            this.newProductColors.push(color)
        },

        // Remove color
        removeColor(index) {
            this.newProductColors.splice(index, 1)
        },

        // Save new variant
        saveNewVariant() {
            this.options.push({name: this.newVariantName, value: this.newVariantValue, type: this.newVariantType});
            this.newVariantName  = '';
            this.newVariantValue = '';
            this.newVariantType  = '';
            this.$refs.variantName.focus();
        },

        // Save color variant
        saveColorsOptions() {
            var values = []
            for (let index = 0; index < this.newProductColors.length; index++) {
                const element = this.newProductColors[index];

                values.push({ color: element.hex })
                
            }

            this.options.push({
                name : this.newVariantName, 
                value: values, 
                type : this.newVariantType
            });
            
            this.newVariantName   = '';
            this.newVariantValue  = '';
            this.newVariantType   = '';
            this.newProductColors = [];
            this.$refs.variantName.focus();
        },

        // Delete variant
        removeVariant(index) {
            this.options.splice(index, 1);
        },

        // Validate form
        validate() {

            // Set empty object for errors
            this.errors = Object

            // Set empty var to check if form is valid
            var isValid = true

            // Check if category exists
            if (!this.form.category) {
                this.errors.category = [ this.$t('t_there_was_error_field') ]
                isValid = false
            }

            // Check if handler exists
            if (!this.form.handler) {
                this.errors.handler = [ this.$t('t_there_was_error_field') ]
                isValid = false
            }

            // Check if price exists
            if (!this.form.price) {
                this.errors.price = [ this.$t('t_there_was_error_field') ]
                isValid = false
            }

            // Check if stock exists
            if (!this.form.stock) {
                this.errors.stock = [ this.$t('t_there_was_error_field') ]
                isValid = false
            }

            // Check if seo_title exists
            if (!this.form.seo_title) {
                this.errors.seo_title = [ this.$t('t_there_was_error_field') ]
                isValid = false
            }

            // Check if seo_description exists
            if (!this.form.seo_description) {
                this.errors.seo_description = [ this.$t('t_there_was_error_field') ]
                isValid = false
            }

            // Check if form valid
            if (isValid) {
                return true
            } else {
                // Show error message
                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                return false
            }

        },

        // Update product
        async update() {

            // Validate form first
            const isFormValid = this.validate()

            // Check if form has error
            if (!isFormValid) {
                return
            }

            let files    = this.$refs.uploader.$el.files

            // Start loading
            this.loading = true

            let data     = new FormData()

            // Title
            this.$store.state.settings.languages.ar ? data.append('title_ar', this.form.title_ar) : ''
            this.$store.state.settings.languages.az ? data.append('title_az', this.form.title_az) : ''
            this.$store.state.settings.languages.cn ? data.append('title_cn', this.form.title_cn) : ''
            this.$store.state.settings.languages.de ? data.append('title_de', this.form.title_de) : ''
            this.$store.state.settings.languages.en ? data.append('title_en', this.form.title_en) : ''
            this.$store.state.settings.languages.es ? data.append('title_es', this.form.title_es) : ''
            this.$store.state.settings.languages.fr ? data.append('title_fr', this.form.title_fr) : ''
            this.$store.state.settings.languages.hi ? data.append('title_hi', this.form.title_hi) : ''
            this.$store.state.settings.languages.hu ? data.append('title_hu', this.form.title_hu) : ''
            this.$store.state.settings.languages.jp ? data.append('title_jp', this.form.title_jp) : ''
            this.$store.state.settings.languages.nl ? data.append('title_nl', this.form.title_nl) : ''
            this.$store.state.settings.languages.po ? data.append('title_po', this.form.title_po) : ''
            this.$store.state.settings.languages.pt ? data.append('title_pt', this.form.title_pt) : ''
            this.$store.state.settings.languages.ro ? data.append('title_ro', this.form.title_ro) : ''
            this.$store.state.settings.languages.ru ? data.append('title_ru', this.form.title_ru) : ''
            this.$store.state.settings.languages.th ? data.append('title_th', this.form.title_th) : ''
            this.$store.state.settings.languages.tr ? data.append('title_tr', this.form.title_tr) : ''
            this.$store.state.settings.languages.ua ? data.append('title_ua', this.form.title_ua) : ''

            // Description
            this.$store.state.settings.languages.ar ? data.append('description_ar', this.form.description_ar) : ''
            this.$store.state.settings.languages.az ? data.append('description_az', this.form.description_az) : ''
            this.$store.state.settings.languages.cn ? data.append('description_cn', this.form.description_cn) : ''
            this.$store.state.settings.languages.de ? data.append('description_de', this.form.description_de) : ''
            this.$store.state.settings.languages.en ? data.append('description_en', this.form.description_en) : ''
            this.$store.state.settings.languages.es ? data.append('description_es', this.form.description_es) : ''
            this.$store.state.settings.languages.fr ? data.append('description_fr', this.form.description_fr) : ''
            this.$store.state.settings.languages.hi ? data.append('description_hi', this.form.description_hi) : ''
            this.$store.state.settings.languages.hu ? data.append('description_hu', this.form.description_hu) : ''
            this.$store.state.settings.languages.jp ? data.append('description_jp', this.form.description_jp) : ''
            this.$store.state.settings.languages.nl ? data.append('description_nl', this.form.description_nl) : ''
            this.$store.state.settings.languages.po ? data.append('description_po', this.form.description_po) : ''
            this.$store.state.settings.languages.pt ? data.append('description_pt', this.form.description_pt) : ''
            this.$store.state.settings.languages.ro ? data.append('description_ro', this.form.description_ro) : ''
            this.$store.state.settings.languages.ru ? data.append('description_ru', this.form.description_ru) : ''
            this.$store.state.settings.languages.th ? data.append('description_th', this.form.description_th) : ''
            this.$store.state.settings.languages.tr ? data.append('description_tr', this.form.description_tr) : ''
            this.$store.state.settings.languages.ua ? data.append('description_ua', this.form.description_ua) : ''
            
            data.append('id', this.form.id)
            data.append('handler', this.form.handler)
            data.append('category', this.form.category)
            this.form.subcategory ? data.append('subcategory', this.form.subcategory) : ''
            this.form.childcategory ? data.append('childcategory', this.form.childcategory) : ''
            data.append('price', this.form.price)
            this.form.discount_type ? data.append('discount_type', this.form.discount_type) : ''
            this.form.discount_value ? data.append('discount_value', this.form.discount_value) : ''
            this.form.purchase_unit ? data.append('purchase_unit', this.form.purchase_unit) : ''
            this.form.main_photo ? data.append('main_photo', this.form.main_photo) : ''
            data.append('stock', this.form.stock)
            this.form.video_provider ? data.append('video_provider', this.form.video_provider) : ''
            this.form.video_link ? data.append('video_link', this.form.video_link) : ''
            this.form.brand ? data.append('brand', this.form.brand) : ''
            data.append('status', this.form.status)
            this.form.barcode ? data.append('barcode', this.form.barcode) : ''
            data.append('shipping_type', this.form.shipping_type)
            this.form.shipping_cost ? data.append('shipping_cost', this.form.shipping_cost) : ''
            this.form.tax_type ? data.append('tax_type', this.form.tax_type) : ''
            this.form.tax_value ? data.append('tax_value', this.form.tax_value) : ''
            this.form.seo_title ? data.append('seo_title', this.form.seo_title) : ''
            this.form.seo_description ? data.append('seo_description', this.form.seo_description) : ''
            data.append('tags', this.form.tags)
            this.form.original_source ? data.append('original_source', this.form.original_source) : ''
            data.append('is_product_zoomer', this.form.is_product_zoomer)

            for (let index = 0; index < files.length; index++) {
                const element = files[index];
                data.append('gallery[]', element)
            }

            // Set product variants & variants attributes
            var variants            = []
            var variants_attributes = []

            // Loop through variants attributes
            if (Array.isArray(this.variantsJSON)) {
                for (let index = 0; index < this.variantsJSON.length; index++) {
                    const variant_attribute = this.variantsJSON[index];
                    variants_attributes.push({ ...variant_attribute })
                }
            }

            // Loop through variants
            for (let index = 0; index < this.options.length; index++) {
                const variant = this.options[index];
                variants.push({ ...variant })
            }

            data.append('product_variants', JSON.stringify(variants))
            
            data.append('product_variants_attributes', JSON.stringify(variants_attributes))

            // Set header config
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            // Send request to server
            await this.$axios
                            .post('dashboard/products/options/update', data, config)
                            .then(response => {
                                // Success
                                this.$message(this.$t('t_product_successfully_updated'), 'thumb-up')

                                // Reset errors
                                this.errors = []

                                // Check selected action after updating product
                                switch (this.form.action) {
                                    case 'stay':
                                        
                                        // Refresh page after updating the product
                                        // We need to refresh page instead of just reset the form 
                                        // So we can prevent in errors in second attempt to update product
                                        this.$router.go()

                                        return

                                    case 'open':
                                        
                                        // Go to product after create
                                        this.$router.push(`/product/${response.data}`)

                                        break;

                                    case 'go':
                                        
                                        // Go to products list in dashboard
                                        this.$router.push('/dashboard/products')

                                        break;
                                
                                    default:

                                        // By default
                                        // Refresh page after updating the product
                                        // We need to refresh page instead of just reset the form 
                                        // So we can prevent in errors in second attempt to update product
                                        this.$router.go()
                                        return

                                        break;
                                }
                            })
                            .catch(error => {

                                // Error form
                                if (error.response.status === 422) {
                                    this.errors  = this.$errors(error.response.data.errors)
                                } else {
                                    console.log(error)
                                }

                                // Show error toast
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                
                            })
                            .finally(() => {
                                // Stop loading
                                this.loading = false
                            })

        }

    },

    mounted() {

        // Set variants
        if (this.product.variants.length) {
            
            for (let index = 0; index < this.product.variants.length; index++) {

                const element = this.product.variants[index];
                
                // Set option
                const variant = {
                    name : element.name,
                    type : element.type,
                    value: element.type === 'color' ? JSON.parse(element.options) : element.options
                }

                // Add option
                this.options.push(variant)

            }

        }

        // Set variants attributes
        if (this.product.variants_attributes.length) {
            
            for (let index = 0; index < this.product.variants_attributes.length; index++) {

                const element    = this.product.variants_attributes[index];

                const attributes = JSON.parse(element.attributes)
                
                this.variantGroupPrices.push(attributes["0"].price)
                this.variantGroupSku.push(attributes["0"].sku)
                this.variantGroupStock.push(attributes["0"].stock)

            }

        }


    }

}
</script>