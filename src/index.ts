/**
 * ServiceStack React Component Library
 *
 * A comprehensive React component library for ServiceStack applications
 */

import { useUtils } from './use/utils'
import { Sole, useConfig } from './use/config'
import { useClient, ClientContext } from './use/client'
import { useAuth } from './use/auth'
import { useFiles } from './use/files'
import { useMetadata } from './use/metadata'
import { useFormatters } from './use/formatters'
import * as css from './components/css'

// Export component types
export * from './components/types'
export * from './types'

// Export hooks
export { useUtils, useConfig, useClient, useAuth, useMetadata, useFiles, useFormatters, css }

// Export contexts
export { ClientContext }
export { ApiStateContext } from './components/TextInput'

// Export all components
export {
    Alert,
    AlertSuccess,
    ErrorSummary,
    InputDescription,
    Icon,
    Loading,

    OutlineButton,
    PrimaryButton,
    SecondaryButton,
    TextLink,

    Breadcrumbs,
    Breadcrumb,
    NavList,
    NavListItem,

    AutoQueryGrid,
    SettingsIcons,
    FilterViews,
    FilterColumn,
    QueryPrefs,
    EnsureAccess,
    EnsureAccessDialog,

    TextInput,
    TextareaInput,
    SelectInput,
    CheckboxInput,
    TagInput,
    FileInput,
    Autocomplete,
    Combobox,
    DynamicInput,
    LookupInput,

    AutoFormFields,
    AutoForm,
    AutoCreateForm,
    AutoEditForm,
    AutoViewForm,
    ConfirmDelete,
    FormLoading,

    DataGrid,
    CellFormat,
    PreviewFormat,
    HtmlFormat,
    MarkupFormat,
    MarkupModel,

    CloseButton,
    SlideOver,
    ModalDialog,
    ModalLookup,
    Tabs,

    DarkModeToggle,
    SignIn,
    MarkdownInput,
    SidebarLayout,
    RouterLink,
} from './components'

// Export Sole for global configuration
export { Sole }
