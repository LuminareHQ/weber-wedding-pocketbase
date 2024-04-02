
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const weberWedding: CustomThemeConfig = {
    name: 'weberWedding',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "12px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "0 0 0",
        "--on-surface": "0 0 0",
        // =~= Theme Colors  =~=
        // primary | #E4BCAC
        "--color-primary-50": "251 245 243", // #fbf5f3
        "--color-primary-100": "250 242 238", // #faf2ee
        "--color-primary-200": "248 238 234", // #f8eeea
        "--color-primary-300": "244 228 222", // #f4e4de
        "--color-primary-400": "236 208 197", // #ecd0c5
        "--color-primary-500": "228 188 172", // #E4BCAC
        "--color-primary-600": "205 169 155", // #cda99b
        "--color-primary-700": "171 141 129", // #ab8d81
        "--color-primary-800": "137 113 103", // #897167
        "--color-primary-900": "112 92 84", // #705c54
        // secondary | #FFA500
        "--color-secondary-50": "255 242 217", // #fff2d9
        "--color-secondary-100": "255 237 204", // #ffedcc
        "--color-secondary-200": "255 233 191", // #ffe9bf
        "--color-secondary-300": "255 219 153", // #ffdb99
        "--color-secondary-400": "255 192 77", // #ffc04d
        "--color-secondary-500": "255 165 0", // #FFA500
        "--color-secondary-600": "230 149 0", // #e69500
        "--color-secondary-700": "191 124 0", // #bf7c00
        "--color-secondary-800": "153 99 0", // #996300
        "--color-secondary-900": "125 81 0", // #7d5100
        // tertiary | #1976D2
        "--color-tertiary-50": "221 234 248", // #ddeaf8
        "--color-tertiary-100": "209 228 246", // #d1e4f6
        "--color-tertiary-200": "198 221 244", // #c6ddf4
        "--color-tertiary-300": "163 200 237", // #a3c8ed
        "--color-tertiary-400": "94 159 224", // #5e9fe0
        "--color-tertiary-500": "25 118 210", // #1976D2
        "--color-tertiary-600": "23 106 189", // #176abd
        "--color-tertiary-700": "19 89 158", // #13599e
        "--color-tertiary-800": "15 71 126", // #0f477e
        "--color-tertiary-900": "12 58 103", // #0c3a67
        // success | #4CAF50
        "--color-success-50": "228 243 229", // #e4f3e5
        "--color-success-100": "219 239 220", // #dbefdc
        "--color-success-200": "210 235 211", // #d2ebd3
        "--color-success-300": "183 223 185", // #b7dfb9
        "--color-success-400": "130 199 133", // #82c785
        "--color-success-500": "76 175 80", // #4CAF50
        "--color-success-600": "68 158 72", // #449e48
        "--color-success-700": "57 131 60", // #39833c
        "--color-success-800": "46 105 48", // #2e6930
        "--color-success-900": "37 86 39", // #255627
        // warning | #FFC107
        "--color-warning-50": "255 246 218", // #fff6da
        "--color-warning-100": "255 243 205", // #fff3cd
        "--color-warning-200": "255 240 193", // #fff0c1
        "--color-warning-300": "255 230 156", // #ffe69c
        "--color-warning-400": "255 212 81", // #ffd451
        "--color-warning-500": "255 193 7", // #FFC107
        "--color-warning-600": "230 174 6", // #e6ae06
        "--color-warning-700": "191 145 5", // #bf9105
        "--color-warning-800": "153 116 4", // #997404
        "--color-warning-900": "125 95 3", // #7d5f03
        // error | #d25151
        "--color-error-50": "248 229 229", // #f8e5e5
        "--color-error-100": "246 220 220", // #f6dcdc
        "--color-error-200": "244 212 212", // #f4d4d4
        "--color-error-300": "237 185 185", // #edb9b9
        "--color-error-400": "224 133 133", // #e08585
        "--color-error-500": "210 81 81", // #d25151
        "--color-error-600": "189 73 73", // #bd4949
        "--color-error-700": "158 61 61", // #9e3d3d
        "--color-error-800": "126 49 49", // #7e3131
        "--color-error-900": "103 40 40", // #672828
        // surface | #7B776E
        "--color-surface-50": "235 235 233", // #ebebe9
        "--color-surface-100": "229 228 226", // #e5e4e2
        "--color-surface-200": "222 221 219", // #dedddb
        "--color-surface-300": "202 201 197", // #cac9c5
        "--color-surface-400": "163 160 154", // #a3a09a
        "--color-surface-500": "123 119 110", // #7B776E
        "--color-surface-600": "111 107 99", // #6f6b63
        "--color-surface-700": "92 89 83", // #5c5953
        "--color-surface-800": "74 71 66", // #4a4742
        "--color-surface-900": "60 58 54", // #3c3a36

    }
}