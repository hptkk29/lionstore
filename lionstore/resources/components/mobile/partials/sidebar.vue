<template>
    <v-navigation-drawer v-model="drawer" app temporary :left="!$vuetify.rtl" :right="$vuetify.rtl">
        
        <!-- Mobile menu header -->
        <div class="mobile-menu-header">

            <!-- My Account -->
            <div class="mobile-menu-account" v-if="$auth.loggedIn">
                <v-list>
                    <v-list-item>
                        <v-list-item-avatar :size="50">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <rect x="0" y="0" width="90" height="90"/>
                                    <circle fill="#fff" opacity="0.3" cx="12" cy="12" r="10"/>
                                    <path d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 L7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z" fill="#fff" opacity="0.3"/>
                                </g>
                            </svg>
                        </v-list-item-avatar>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title class="fs-12 font-weight-medium white--text pb-1" v-text="$auth.user.username"></v-list-item-title>
                            <v-list-item-subtitle class="white--text fs-11 pt-1" v-text="$auth.user.email"></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>  
            </div>

            <!-- Authentication -->
            <div class="mobile-menu-auth" v-else>

                <!-- Login -->
                <nuxt-link to="/auth/login">
                    <span v-t="'t_login'"></span>
                </nuxt-link>

                <!-- Register -->
                <nuxt-link to="/auth/register">
                    <span v-t="'t_register'"></span>
                </nuxt-link>

            </div>

            <!-- Dark mode -->
            <div class="mobile-dark-mode">

                <!-- Dark mode enabled -->
                <div v-if="$vuetify.theme.dark" @click="setDarkMode()">
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M12,15 C10.3431458,15 9,13.6568542 9,12 C9,10.3431458 10.3431458,9 12,9 C13.6568542,9 15,10.3431458 15,12 C15,13.6568542 13.6568542,15 12,15 Z" fill="#000000" fill-rule="nonzero"/> <path d="M19.5,10.5 L21,10.5 C21.8284271,10.5 22.5,11.1715729 22.5,12 C22.5,12.8284271 21.8284271,13.5 21,13.5 L19.5,13.5 C18.6715729,13.5 18,12.8284271 18,12 C18,11.1715729 18.6715729,10.5 19.5,10.5 Z M16.0606602,5.87132034 L17.1213203,4.81066017 C17.7071068,4.22487373 18.6568542,4.22487373 19.2426407,4.81066017 C19.8284271,5.39644661 19.8284271,6.34619408 19.2426407,6.93198052 L18.1819805,7.99264069 C17.5961941,8.57842712 16.6464466,8.57842712 16.0606602,7.99264069 C15.4748737,7.40685425 15.4748737,6.45710678 16.0606602,5.87132034 Z M16.0606602,18.1819805 C15.4748737,17.5961941 15.4748737,16.6464466 16.0606602,16.0606602 C16.6464466,15.4748737 17.5961941,15.4748737 18.1819805,16.0606602 L19.2426407,17.1213203 C19.8284271,17.7071068 19.8284271,18.6568542 19.2426407,19.2426407 C18.6568542,19.8284271 17.7071068,19.8284271 17.1213203,19.2426407 L16.0606602,18.1819805 Z M3,10.5 L4.5,10.5 C5.32842712,10.5 6,11.1715729 6,12 C6,12.8284271 5.32842712,13.5 4.5,13.5 L3,13.5 C2.17157288,13.5 1.5,12.8284271 1.5,12 C1.5,11.1715729 2.17157288,10.5 3,10.5 Z M12,1.5 C12.8284271,1.5 13.5,2.17157288 13.5,3 L13.5,4.5 C13.5,5.32842712 12.8284271,6 12,6 C11.1715729,6 10.5,5.32842712 10.5,4.5 L10.5,3 C10.5,2.17157288 11.1715729,1.5 12,1.5 Z M12,18 C12.8284271,18 13.5,18.6715729 13.5,19.5 L13.5,21 C13.5,21.8284271 12.8284271,22.5 12,22.5 C11.1715729,22.5 10.5,21.8284271 10.5,21 L10.5,19.5 C10.5,18.6715729 11.1715729,18 12,18 Z M4.81066017,4.81066017 C5.39644661,4.22487373 6.34619408,4.22487373 6.93198052,4.81066017 L7.99264069,5.87132034 C8.57842712,6.45710678 8.57842712,7.40685425 7.99264069,7.99264069 C7.40685425,8.57842712 6.45710678,8.57842712 5.87132034,7.99264069 L4.81066017,6.93198052 C4.22487373,6.34619408 4.22487373,5.39644661 4.81066017,4.81066017 Z M4.81066017,19.2426407 C4.22487373,18.6568542 4.22487373,17.7071068 4.81066017,17.1213203 L5.87132034,16.0606602 C6.45710678,15.4748737 7.40685425,15.4748737 7.99264069,16.0606602 C8.57842712,16.6464466 8.57842712,17.5961941 7.99264069,18.1819805 L6.93198052,19.2426407 C6.34619408,19.8284271 5.39644661,19.8284271 4.81066017,19.2426407 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/> </g> </svg></span>
                </div>

                <!-- Dark mode disabled -->
                <div v-else @click="setDarkMode()">
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M12.0700837,4.0003006 C11.3895108,5.17692613 11,6.54297551 11,8 C11,12.3948932 14.5439081,15.9620623 18.9299163,15.9996994 C17.5467214,18.3910707 14.9612535,20 12,20 C7.581722,20 4,16.418278 4,12 C4,7.581722 7.581722,4 12,4 C12.0233848,4 12.0467462,4.00010034 12.0700837,4.0003006 Z" fill="#000000"/> </g> </svg></span>
                </div>

            </div>

        </div>

        <!-- Links -->
        <v-list dense class="mobile-menu-links">

            <!-- Home -->
            <v-list-item nuxt to="/" exact exact-active-class="transparent">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M3.95709826,8.41510662 L11.47855,3.81866389 C11.7986624,3.62303967 12.2013376,3.62303967 12.52145,3.81866389 L20.0429,8.41510557 C20.6374094,8.77841684 21,9.42493654 21,10.1216692 L21,19.0000642 C21,20.1046337 20.1045695,21.0000642 19,21.0000642 L4.99998155,21.0000673 C3.89541205,21.0000673 2.99998155,20.1046368 2.99998155,19.0000673 C2.99998155,19.0000663 2.99998155,19.0000652 2.99998155,19.0000642 L2.99999828,10.1216672 C2.99999935,9.42493561 3.36258984,8.77841732 3.95709826,8.41510662 Z" fill="#000000" opacity="0.3"/> <path d="M13.8,12 C13.1562,12 12.4033,12.7298529 12,13.2 C11.5967,12.7298529 10.8438,12 10.2,12 C9.0604,12 8.4,12.8888719 8.4,14.0201635 C8.4,15.2733878 9.6,16.6 12,18 C14.4,16.6 15.6,15.3 15.6,14.1 C15.6,12.9687084 14.9396,12 13.8,12 Z" fill="#000000" opacity="0.3"/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_home'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- My account -->
            <v-list-item nuxt to="/customer/settings" exact exact-active-class="transparent" v-if="$auth.loggedIn">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23px" height="23px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M18.6225,9.75 L18.75,9.75 C19.9926407,9.75 21,10.7573593 21,12 C21,13.2426407 19.9926407,14.25 18.75,14.25 L18.6854912,14.249994 C18.4911876,14.250769 18.3158978,14.366855 18.2393549,14.5454486 C18.1556809,14.7351461 18.1942911,14.948087 18.3278301,15.0846699 L18.372535,15.129375 C18.7950334,15.5514036 19.03243,16.1240792 19.03243,16.72125 C19.03243,17.3184208 18.7950334,17.8910964 18.373125,18.312535 C17.9510964,18.7350334 17.3784208,18.97243 16.78125,18.97243 C16.1840792,18.97243 15.6114036,18.7350334 15.1896699,18.3128301 L15.1505513,18.2736469 C15.008087,18.1342911 14.7951461,18.0956809 14.6054486,18.1793549 C14.426855,18.2558978 14.310769,18.4311876 14.31,18.6225 L14.31,18.75 C14.31,19.9926407 13.3026407,21 12.06,21 C10.8173593,21 9.81,19.9926407 9.81,18.75 C9.80552409,18.4999185 9.67898539,18.3229986 9.44717599,18.2361469 C9.26485393,18.1556809 9.05191298,18.1942911 8.91533009,18.3278301 L8.870625,18.372535 C8.44859642,18.7950334 7.87592081,19.03243 7.27875,19.03243 C6.68157919,19.03243 6.10890358,18.7950334 5.68746499,18.373125 C5.26496665,17.9510964 5.02757002,17.3784208 5.02757002,16.78125 C5.02757002,16.1840792 5.26496665,15.6114036 5.68716991,15.1896699 L5.72635306,15.1505513 C5.86570889,15.008087 5.90431906,14.7951461 5.82064513,14.6054486 C5.74410223,14.426855 5.56881236,14.310769 5.3775,14.31 L5.25,14.31 C4.00735931,14.31 3,13.3026407 3,12.06 C3,10.8173593 4.00735931,9.81 5.25,9.81 C5.50008154,9.80552409 5.67700139,9.67898539 5.76385306,9.44717599 C5.84431906,9.26485393 5.80570889,9.05191298 5.67216991,8.91533009 L5.62746499,8.870625 C5.20496665,8.44859642 4.96757002,7.87592081 4.96757002,7.27875 C4.96757002,6.68157919 5.20496665,6.10890358 5.626875,5.68746499 C6.04890358,5.26496665 6.62157919,5.02757002 7.21875,5.02757002 C7.81592081,5.02757002 8.38859642,5.26496665 8.81033009,5.68716991 L8.84944872,5.72635306 C8.99191298,5.86570889 9.20485393,5.90431906 9.38717599,5.82385306 L9.49484664,5.80114977 C9.65041313,5.71688974 9.7492905,5.55401473 9.75,5.3775 L9.75,5.25 C9.75,4.00735931 10.7573593,3 12,3 C13.2426407,3 14.25,4.00735931 14.25,5.25 L14.249994,5.31450877 C14.250769,5.50881236 14.366855,5.68410223 14.552824,5.76385306 C14.7351461,5.84431906 14.948087,5.80570889 15.0846699,5.67216991 L15.129375,5.62746499 C15.5514036,5.20496665 16.1240792,4.96757002 16.72125,4.96757002 C17.3184208,4.96757002 17.8910964,5.20496665 18.312535,5.626875 C18.7350334,6.04890358 18.97243,6.62157919 18.97243,7.21875 C18.97243,7.81592081 18.7350334,8.38859642 18.3128301,8.81033009 L18.2736469,8.84944872 C18.1342911,8.99191298 18.0956809,9.20485393 18.1761469,9.38717599 L18.1988502,9.49484664 C18.2831103,9.65041313 18.4459853,9.7492905 18.6225,9.75 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/> <path d="M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_my_account'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- My orders -->
            <v-list-item nuxt to="/customer/orders" exact exact-active-class="transparent" v-if="$auth.loggedIn">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M12,4.56204994 L7.76822128,9.6401844 C7.4146572,10.0644613 6.7840925,10.1217854 6.3598156,9.76822128 C5.9355387,9.4146572 5.87821464,8.7840925 6.23177872,8.3598156 L11.2317787,2.3598156 C11.6315738,1.88006147 12.3684262,1.88006147 12.7682213,2.3598156 L17.7682213,8.3598156 C18.1217854,8.7840925 18.0644613,9.4146572 17.6401844,9.76822128 C17.2159075,10.1217854 16.5853428,10.0644613 16.2317787,9.6401844 L12,4.56204994 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/> <path d="M3.5,9 L20.5,9 C21.0522847,9 21.5,9.44771525 21.5,10 C21.5,10.132026 21.4738562,10.2627452 21.4230769,10.3846154 L17.7692308,19.1538462 C17.3034221,20.271787 16.2111026,21 15,21 L9,21 C7.78889745,21 6.6965779,20.271787 6.23076923,19.1538462 L2.57692308,10.3846154 C2.36450587,9.87481408 2.60558331,9.28934029 3.11538462,9.07692308 C3.23725479,9.02614384 3.36797398,9 3.5,9 Z M12,17 C13.1045695,17 14,16.1045695 14,15 C14,13.8954305 13.1045695,13 12,13 C10.8954305,13 10,13.8954305 10,15 C10,16.1045695 10.8954305,17 12,17 Z" fill="#000000"/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_my_orders'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- My addresses -->
            <v-list-item nuxt to="/customer/addresses" exact exact-active-class="transparent" v-if="$auth.loggedIn">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M5,10.5 C5,6 8,3 12.5,3 C17,3 20,6.75 20,10.5 C20,12.8325623 17.8236613,16.03566 13.470984,20.1092932 C12.9154018,20.6292577 12.0585054,20.6508331 11.4774555,20.1594925 C7.15915182,16.5078313 5,13.2880005 5,10.5 Z M12.5,12 C13.8807119,12 15,10.8807119 15,9.5 C15,8.11928813 13.8807119,7 12.5,7 C11.1192881,7 10,8.11928813 10,9.5 C10,10.8807119 11.1192881,12 12.5,12 Z" fill="#000000" fill-rule="nonzero"/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_my_addresses'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- Reviews -->
            <v-list-item nuxt to="/customer/reviews" exact exact-active-class="transparent" v-if="$auth.loggedIn">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23px" height="23px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon points="0 0 24 0 24 24 0 24"/> <path d="M12,18 L7.91561963,20.1472858 C7.42677504,20.4042866 6.82214789,20.2163401 6.56514708,19.7274955 C6.46280801,19.5328351 6.42749334,19.309867 6.46467018,19.0931094 L7.24471742,14.545085 L3.94038429,11.3241562 C3.54490071,10.938655 3.5368084,10.3055417 3.92230962,9.91005817 C4.07581822,9.75257453 4.27696063,9.65008735 4.49459766,9.61846284 L9.06107374,8.95491503 L11.1032639,4.81698575 C11.3476862,4.32173209 11.9473121,4.11839309 12.4425657,4.36281539 C12.6397783,4.46014562 12.7994058,4.61977315 12.8967361,4.81698575 L14.9389263,8.95491503 L19.5054023,9.61846284 C20.0519472,9.69788046 20.4306287,10.2053233 20.351211,10.7518682 C20.3195865,10.9695052 20.2170993,11.1706476 20.0596157,11.3241562 L16.7552826,14.545085 L17.5353298,19.0931094 C17.6286908,19.6374458 17.263103,20.1544017 16.7187666,20.2477627 C16.5020089,20.2849396 16.2790408,20.2496249 16.0843804,20.1472858 L12,18 Z" fill="#000000"/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_reviews'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- Wishlist -->
            <v-list-item nuxt to="/customer/wishlist" exact exact-active-class="transparent" v-if="$auth.loggedIn">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23px" height="23px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <polygon points="0 0 24 0 24 24 0 24"/> <path d="M16.5,4.5 C14.8905,4.5 13.00825,6.32463215 12,7.5 C10.99175,6.32463215 9.1095,4.5 7.5,4.5 C4.651,4.5 3,6.72217984 3,9.55040872 C3,12.6834696 6,16 12,19.5 C18,16 21,12.75 21,9.75 C21,6.92177112 19.349,4.5 16.5,4.5 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/> <path d="M12,19.5 C6,16 3,12.6834696 3,9.55040872 C3,6.72217984 4.651,4.5 7.5,4.5 C9.1095,4.5 10.99175,6.32463215 12,7.5 L12,19.5 Z" fill="#000000" fill-rule="nonzero"/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_my_wishlist'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- Logout -->
            <v-list-item @click="logout()" exact exact-active-class="transparent" v-if="$auth.loggedIn">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="22px" height="22px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M14.0069431,7.00607258 C13.4546584,7.00607258 13.0069431,6.55855153 13.0069431,6.00650634 C13.0069431,5.45446114 13.4546584,5.00694009 14.0069431,5.00694009 L15.0069431,5.00694009 C17.2160821,5.00694009 19.0069431,6.7970243 19.0069431,9.00520507 L19.0069431,15.001735 C19.0069431,17.2099158 17.2160821,19 15.0069431,19 L3.00694311,19 C0.797804106,19 -0.993056895,17.2099158 -0.993056895,15.001735 L-0.993056895,8.99826498 C-0.993056895,6.7900842 0.797804106,5 3.00694311,5 L4.00694793,5 C4.55923268,5 5.00694793,5.44752105 5.00694793,5.99956624 C5.00694793,6.55161144 4.55923268,6.99913249 4.00694793,6.99913249 L3.00694311,6.99913249 C1.90237361,6.99913249 1.00694311,7.89417459 1.00694311,8.99826498 L1.00694311,15.001735 C1.00694311,16.1058254 1.90237361,17.0008675 3.00694311,17.0008675 L15.0069431,17.0008675 C16.1115126,17.0008675 17.0069431,16.1058254 17.0069431,15.001735 L17.0069431,9.00520507 C17.0069431,7.90111468 16.1115126,7.00607258 15.0069431,7.00607258 L14.0069431,7.00607258 Z" fill="#000000" fill-rule="nonzero" opacity="0.3" transform="translate(9.006943, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-9.006943, -12.000000) "/> <rect fill="#000000" opacity="0.3" transform="translate(14.000000, 12.000000) rotate(-270.000000) translate(-14.000000, -12.000000) " x="13" y="6" width="2" height="12" rx="1"/> <path d="M21.7928932,9.79289322 C22.1834175,9.40236893 22.8165825,9.40236893 23.2071068,9.79289322 C23.5976311,10.1834175 23.5976311,10.8165825 23.2071068,11.2071068 L20.2071068,14.2071068 C19.8165825,14.5976311 19.1834175,14.5976311 18.7928932,14.2071068 L15.7928932,11.2071068 C15.4023689,10.8165825 15.4023689,10.1834175 15.7928932,9.79289322 C16.1834175,9.40236893 16.8165825,9.40236893 17.2071068,9.79289322 L19.5,12.0857864 L21.7928932,9.79289322 Z" fill="#000000" fill-rule="nonzero" transform="translate(19.500000, 12.000000) rotate(-90.000000) translate(-19.500000, -12.000000) "/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_logout'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- Contact us -->
            <v-list-item nuxt to="/contact" exact exact-active-class="transparent">
                <v-list-item-icon>
                    <span class="svg-icon svg-icon-primary svg-icon-2x"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="23px" height="23px" viewBox="0 0 24 24" version="1.1"> <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <rect x="0" y="0" width="24" height="24"/> <path d="M16,15.6315789 L16,12 C16,10.3431458 14.6568542,9 13,9 L6.16183229,9 L6.16183229,5.52631579 C6.16183229,4.13107011 7.29290239,3 8.68814808,3 L20.4776218,3 C21.8728674,3 23.0039375,4.13107011 23.0039375,5.52631579 L23.0039375,13.1052632 L23.0206157,17.786793 C23.0215995,18.0629336 22.7985408,18.2875874 22.5224001,18.2885711 C22.3891754,18.2890457 22.2612702,18.2363324 22.1670655,18.1421277 L19.6565168,15.6315789 L16,15.6315789 Z" fill="#000000"/> <path d="M1.98505595,18 L1.98505595,13 C1.98505595,11.8954305 2.88048645,11 3.98505595,11 L11.9850559,11 C13.0896254,11 13.9850559,11.8954305 13.9850559,13 L13.9850559,18 C13.9850559,19.1045695 13.0896254,20 11.9850559,20 L4.10078614,20 L2.85693427,21.1905292 C2.65744295,21.3814685 2.34093638,21.3745358 2.14999706,21.1750444 C2.06092565,21.0819836 2.01120804,20.958136 2.01120804,20.8293182 L2.01120804,18.32426 C1.99400175,18.2187196 1.98505595,18.1104045 1.98505595,18 Z M6.5,14 C6.22385763,14 6,14.2238576 6,14.5 C6,14.7761424 6.22385763,15 6.5,15 L11.5,15 C11.7761424,15 12,14.7761424 12,14.5 C12,14.2238576 11.7761424,14 11.5,14 L6.5,14 Z M9.5,16 C9.22385763,16 9,16.2238576 9,16.5 C9,16.7761424 9.22385763,17 9.5,17 L11.5,17 C11.7761424,17 12,16.7761424 12,16.5 C12,16.2238576 11.7761424,16 11.5,16 L9.5,16 Z" fill="#000000" opacity="0.3"/> </g> </svg></span>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="fs-11 font-weight-medium" v-t="'t_support'"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>

        </v-list>

        <template v-slot:append>

            <!-- Languages -->
            <div class="mobile-menu-language">
                <v-menu offset-y top content-class="mobile-lang-menu-content" :max-height="250">
                    <template v-slot:activator="{ on, attrs }">
                        <div v-on="on" v-bind="attrs" class="mlm-languages">
                            <img :src="`/images/flags/${ getSelectedLanguage.flag }`" />
                            <span v-text="getSelectedLanguage.title"></span>
                            <v-icon>mdi-chevron-down</v-icon>
                        </div>
                    </template>
                    <v-card flat tile>
                        <ul class="px-0">
                            <template v-for="lang in languages">
                                <li :key="lang.code" :class="lang.code === $i18n.locale ? 'selected-language' : ''" @click="setLocale(lang.code)">
                                    <img :src="`/images/flags/${ lang.flag }`">
                                    <span v-text="lang.title"></span>
                                </li>
                            </template>
                        </ul>
                    </v-card>
                </v-menu>
            </div>
            
        </template>

    </v-navigation-drawer>
</template>

<script>
import { loadMessages } from '~/plugins/i18n'

export default {
    
    data() {
        return {
            drawer: false
        }
    },

    computed: {

        // Get sidebar links
        items() {
            return [
                { text: this.$t('t_home'), icon: 'mdi-home', size: 22, to: '/' },
                { text: this.$t('t_contact_us'), icon: 'mdi-email', size: 20, to: '/contact' },
                { text: this.$t('t_privacy_policy'), icon: 'mdi-incognito', size: 20, to: '/help/privacy-policy' },
                { text: this.$t('t_terms_and_conditions'), icon: 'mdi-format-list-text', size: 20, to: '/help/terms' },
            ]
        },

        // Available languages
        languages() {

            // Set empty array variable
            var data = []

            // Check for supported languages
            this.$store.state.settings.languages.en ? data.push({ title: 'English', code: 'en', flag: 'US.png' }) : ''
            this.$store.state.settings.languages.de ? data.push({ title: 'Deutsch', code: 'de', flag: 'de.png' }) : ''
            this.$store.state.settings.languages.es ? data.push({ title: 'Español', code: 'es', flag: 'ES.png' }) : ''
            this.$store.state.settings.languages.fr ? data.push({ title: 'Français', code: 'fr', flag: 'FR.png' }) : ''
            this.$store.state.settings.languages.hu ? data.push({ title: 'Magyar', code: 'hu', flag: 'HU.png' }) : ''
            this.$store.state.settings.languages.nl ? data.push({ title: 'Nederlands', code: 'nl', flag: 'NL.png' }) : ''
            this.$store.state.settings.languages.po ? data.push({ title: 'Polski', code: 'po', flag: 'PL.png' }) : ''
            this.$store.state.settings.languages.pt ? data.push({ title: 'Português', code: 'pt', flag: 'BR.png' }) : ''
            this.$store.state.settings.languages.ro ? data.push({ title: 'Română', code: 'ro', flag: 'RO.png' }) : ''
            this.$store.state.settings.languages.az ? data.push({ title: 'Azərbaycan', code: 'az', flag: 'AZ.png' }) : ''
            this.$store.state.settings.languages.cn ? data.push({ title: '简体中文', code: 'cn', flag: 'CN.png' }) : ''
            this.$store.state.settings.languages.jp ? data.push({ title: '日本語', code: 'jp', flag: 'JP.png' }) : ''
            this.$store.state.settings.languages.hi ? data.push({ title: 'भारतीय', code: 'hi', flag: 'IN.png' }) : ''
            this.$store.state.settings.languages.ru ? data.push({ title: 'Pусский', code: 'ru', flag: 'RU.png' }) : ''
            this.$store.state.settings.languages.th ? data.push({ title: 'ไทย', code: 'th', flag: 'TH.png' }) : ''
            this.$store.state.settings.languages.tr ? data.push({ title: 'Türkçe‪', code: 'tr', flag: 'TR.png' }) : ''
            this.$store.state.settings.languages.ar ? data.push({ title: 'العربية', code: 'ar', flag: 'SA.png' }) : ''
            this.$store.state.settings.languages.ua ? data.push({ title: 'Українська', code: 'ua', flag: 'UA.png' }) : ''

            // Return langs
            return data

        },

        // Get selected language
        getSelectedLanguage() {

            // Get currenct locale
            const locale = this.$i18n.locale

            // Search this locale in supported languages
            const find = this.languages.find(item => {
                return item.code === locale
            })

            // Check if locale exits
            if (find) {
                return {
                    flag : find.flag,
                    code : find.code,
                    title: find.title
                }
            } else {

                // Return English as default
                // to prevent errors
                return {
                    flag : 'US.png',
                    code : 'en',
                    title: 'English'
                }

            }

        }

    },

    methods: {

        // Set lcale
        async setLocale(locale) {

            await loadMessages(locale)

            this.$i18n.locale = locale

            // Check if rtl required
            if (locale === 'ar') {
                this.$vuetify.rtl = true
            } else {
                this.$vuetify.rtl = false
            }

            // Set locale
            this.$cookies.set('locale', locale, this.$cookiesOptions())

            // Force update
            this.$forceUpdate()

        },

        // Set dark mode ON/OFF
        setDarkMode() {

            // Get dark mode status
            const status  = this.$vuetify.theme.dark

            // Set cookies options
            const options = this.$cookiesOptions()

            // Check if dark mode enabled
            if (status) {
                
                // Remove cookie
                this.$cookies.remove('dark_mode', options)

                // Disable dark mode
                this.$vuetify.theme.dark = false

            } else {

                // Dark mode not yet enabled
                this.$cookies.set('dark_mode', "enabled", options)

                // Enable dark mode
                this.$vuetify.theme.dark = true

            }
            
            // Force update
            this.$forceUpdate()
        },

        // Logout
        async logout() {
                
            await this.$auth.logout()

            delete this.$axios.defaults.headers.common["Authorization"]
            delete this.$auth.ctx.app.$axios.defaults.headers.common["Authorization"]

            // Redirect to Home
            if (this.$route.path !== '/') {
                this.$router.push('/')
            }

        }

    },

    created() {
        this.$nuxt.$on('open::mobile::sidebar', () => {
            this.drawer = !this.drawer
        })
    }

}
</script>