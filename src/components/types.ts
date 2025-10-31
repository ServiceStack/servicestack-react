// React Component Type Definitions
import type { CSSProperties, ComponentType, ReactNode } from 'react'
import type { Apis } from '../use/metadata'
import type {
  ResponseStatus, InputProp, TableStyleOptions, Breakpoint, ApiRequest, MetadataType,
  InputInfo, AutoQueryConvention, ApiPrefs, GridAllowOptions, GridShowOptions, MetadataPropertyType,
  ApiResponseType, UploadedFile, ImageInfo, MarkdownInputOptions, RefInfo, FormatInfo, Column, AuthenticateResponse,
  ColumnSettings
} from '@/types'

export type StyleValue = CSSProperties | string

// Input Components
export interface TextInputProps {
  status?: ResponseStatus|null
  id: string
  type?: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string|number
  onChange?: (value: string|number) => void
}
export interface TextInputRef {
  focus(): void
}

export interface TextareaInputProps {
  status?: ResponseStatus|null
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
}

export interface SelectInputProps {
  status?: ResponseStatus
  id: string
  value?: string
  onChange?: (value: string) => void
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  placeholder?: string
  options?: any
  values?: string[]
  entries?: { key:string, value:string }[]
}

// React callback types (replacing Vue emits)
export type OnUpdateModelValue<T> = (value:T) => void
export type OnSuccess = (response:any) => void
export type OnSave = (response:any) => void
export type OnDelete = (response:any) => void
export type OnError = (error:ResponseStatus) => void
export type OnDone = () => void
export type OnClose = () => void

export interface CheckboxInputProps {
  value?: boolean
  onChange?: (value: boolean) => void
  status?: ResponseStatus
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
}

export interface FileInputProps {
  multiple?: boolean
  status?: ResponseStatus|null
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  values?:string[]
  files?:UploadedFile[]
}

// Button Components
export interface PrimaryButtonProps {
  type?: "submit" | "button" | "reset"
  href?: string
  color?: "blue" | "purple" | "red" | "green" | "sky" | "cyan" | "indigo"
  onClick?: () => void
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export interface SecondaryButtonProps {
  type?: "submit" | "button" | "reset"
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  children?: ReactNode
}

export interface OutlineButtonProps {
  type?: "submit" | "button" | "reset"
  href?: string
  onClick?: () => void
  children?: ReactNode
}

// Form Components
export interface AutoFormProps {
    type: string|InstanceType<any>|Function
    value?: ApiRequest|any
    onChange?: (value: any) => void
    onSuccess?: OnSuccess
    onError?: OnError
    onDone?: OnDone
    heading?: string
    subHeading?: string
    showLoading?: boolean
    jsconfig?: string
    formStyle?: "slideOver" | "card"
    metaType?: MetadataType
    configureField?: (field:InputProp) => void
    configureFormLayout?: (field:InputProp[]) => void

    panelClass?: string
    bodyClass?: string
    formClass?: string
    innerFormClass?: string
    headerClass?: string
    buttonsClass?: string
    headingClass?: string
    subHeadingClass?: string
    submitLabel?: string
    allowSubmit?: (model:any) => boolean
}

export interface AutoFormBaseProps {
  type: string|InstanceType<any>|Function
  formStyle?: "slideOver" | "card"
  panelClass?: string
  formClass?: string
  headingClass?: string
  subHeadingClass?: string
  buttonsClass?: string,
  heading?: string
  subHeading?: string
  autosave?: boolean
  showLoading?: boolean,
  showCancel?: boolean
  configureField?: (field:InputProp) => void
  configureFormLayout?: (field:InputProp[]) => void
}

export interface AutoCreateFormProps extends AutoFormBaseProps {
  onDone?: OnDone
  onSave?: OnSave
  onError?: OnError
}

export interface AutoEditFormProps extends AutoFormBaseProps {
  value: any
  onChange?: (value: any) => void
  deleteType?: string|InstanceType<any>|Function
  onDone?: OnDone
  onSave?: OnSave
  onDelete?: OnDelete
  onError?: OnError
}

export interface AutoViewFormProps {
  model: any
  apis?: Apis,
  typeName?: string,
  onDone?: OnDone
  onSave?: OnSave
  onDelete?: OnDelete
  onError?: OnError
  formStyle?: "slideOver" | "card"
  panelClass?: string
  formClass?: string
  headingClass?: string
  subHeadingClass?: string
  heading?: string
  subHeading?: string
  showLoading?: boolean
  deleteType?: string|InstanceType<any>|Function
}

// Additional Input Components
export interface TagInputProps {
  status?: ResponseStatus|null
  id: string
  type?: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  value?: string|string[]
  onChange?: (value: string|string[]) => void
  delimiters?: string[]
  allowableValues?: string[]
  string?: boolean
  maxVisibleItems?: number
  converter?: (value:any) => string|string[]
}

export interface AutocompleteProps {
  status?: ResponseStatus|null
  id: string
  type?: string
  label?: string
  help?: string
  placeholder?: string
  multiple?: boolean
  required?: boolean
  options?: any[]
  value?: any
  onChange?: (value: any[]|any) => void
  match:(item:any,value:string) => boolean
  viewCount?: number
  pageSize?: number
}

export interface ComboboxProps {
    id: string
    value?: any
    onChange?: (value: any[]|any) => void
    multiple?: boolean
    options?: any
    values?: string[]
    entries?: { key:string, value:string }[]
}

export interface ComboboxRef {
  toggle(expand:boolean): void
}

export interface DynamicInputProps {
  input: InputProp|InputInfo
  value: ApiRequest
  onChange?: (value: any) => void
  api: ApiResponseType|null
}

export interface LookupInputProps {
  id?: string
  status?: ResponseStatus|null
  input: InputProp|InputInfo
  metadataType: MetadataType
  value: any
  onChange?: (value: any) => void
  label?: string
  labelClass?: string
  help?: string
}

// Grid Components
export interface DataGridProps {
    items: any[]
    id?: string
    type?: string|InstanceType<any>|Function
    tableStyle?: TableStyleOptions
    selectedColumns?:string[]|string
    className?: string
    gridClass?: string
    grid2Class?: string
    grid3Class?: string
    grid4Class?: string
    tableClass?: string
    theadClass?: string
    tbodyClass?: string
    theadRowClass?: string
    theadCellClass?: string
    isSelected?:(row:any) => boolean
    headerTitle?:(name:string) => string
    headerTitles?: {[name:string]:string}
    visibleFrom?: {[name:string]:Breakpoint|"never"}
    rowClass?:(model:any,i:number) => string
    rowStyle?:(model:any,i:number) => StyleValue | undefined
    onHeaderSelected?: (name:string, ev:Event) => void
    onRowSelected?: (item:any, ev:Event) => void
}

export interface AutoQueryGridProps {
    filterDefinitions?: AutoQueryConvention[]
    id?: string
    apis?: string|string[]
    type?: string|InstanceType<any>|Function
    prefs?: ApiPrefs

    deny?: string|GridAllowOptions|GridAllowOptions[]
    hide?: string|GridShowOptions|GridShowOptions[]

    selectedColumns?:string[]|string
    toolbarButtonClass?: string
    tableStyle?: TableStyleOptions
    gridClass?: string
    grid2Class?: string
    grid3Class?: string
    grid4Class?: string
    tableClass?: string
    theadClass?: string
    tbodyClass?: string
    theadRowClass?: string
    theadCellClass?: string

    headerTitle?:(name:string) => string
    headerTitles?: {[name:string]:string}
    visibleFrom?: {[name:string]:Breakpoint|"never"}
    rowClass?:(model:any,i:number) => string
    rowStyle?:(model:any,i:number) => StyleValue | undefined
    modelTitle?: string
    newButtonLabel?: string

    apiPrefs?: ApiPrefs
    canFilter?:(column:string) => boolean
    disableKeyBindings?:(column:string) => boolean
    configureField?: (field:InputProp) => void
    skip?: number
    create?: boolean
    edit?: string|number
    filters?: any

    onHeaderSelected?: (name:string, ev:Event) => void
    onRowSelected?: (item:any, ev:Event) => void
    onNav?: (args:any) => void
}

// Modal Components
export interface ModalDialogProps {
  id?: string
  modalClass?: string
  sizeClass?: string
  closeButtonClass?: string
  configureField?: (field:InputProp) => void
  onDone?: OnDone
  children?: ReactNode
}

export interface SlideOverProps {
  id?: string
  title?: string
  contentClass?: string
  onDone?: OnDone
  children?: ReactNode
}

// Navigation Components
export interface BreadcrumbsProps {
  homeHref?: string
  homeLabel?: string
  children?: ReactNode
}

export interface BreadcrumbProps {
  href?: string
  title?: string
  children?: ReactNode
}

// Utility Components
export interface LoadingProps {
  imageClass?: string
  className?: string
}

export interface IconProps {
  image?: ImageInfo
  svg?: string
  src?: string
  alt?: string
  type?: string
}

export interface AlertProps {
    type?: "warn" | "info" | "error" | "success"
    hideIcon?: boolean
    className?: string
    dangerouslySetInnerHTML?: { __html: string }
    children?: ReactNode
}

export interface AlertSuccessProps {
    message?: string
}

export interface ErrorSummaryProps {
  status?: ResponseStatus|undefined
  except?: string | string[]
  className?: string
  errorSummary?: string
}

// Form Components
export interface AutoFormFieldsProps {
  value: ApiRequest
  onChange?: (value: any) => void
  type?: string
  metaType?: MetadataType
  api: {error?:ResponseStatus}|null
  formLayout?: InputInfo[]
  configureField?: (field:InputProp) => void
  configureFormLayout?: (field:InputProp[]) => void
  hideSummary?: boolean
  flexClass?: string
  divideClass?: string
  spaceClass?: string
  fieldsetClass?: string
}

export interface ConfirmDeleteProps {
  onDelete?: () => void
  children?: ReactNode
}

export interface FormLoadingProps {
  icon?: boolean
  text?: string
}

// Format Components
export interface CellFormatProps {
  type: MetadataType,
  propType: MetadataPropertyType,
  value: Object
}

export interface PreviewFormatProps {
  value: any
  format?:FormatInfo
  includeIcon?: boolean
  includeCount?: boolean
  maxFieldLength?: number
  maxNestedFields?: number
  maxNestedFieldLength?: number
}

export interface HtmlFormatProps {
  value?: any,
  depth?: number
  fieldAttrs?: (k:string) => any
  classes?: (type:'object'|'array',tag:'div'|'table'|'thead'|'th'|'tr'|'td',depth:number,cls:string,index?:number) => string
}

export interface MarkupFormatProps {
  value: any,
  imageClass?: string
}

export interface MarkupModelProps {
  value: any,
  imageClass?: string
}

// Additional Components
export interface InputDescriptionProps {
  id: string
  description: string
}

export interface TextLinkProps {
  color?: "blue" | "purple" | "red" | "green" | "sky" | "cyan" | "indigo"
  href?: string
  children?: ReactNode
}

export interface NavListProps {
  title?: string
  children?: ReactNode
}

export interface NavListItemProps {
  title: string
  href: string
  icon?: ImageInfo
  iconSvg?: string
  iconSrc?: string
  iconAlt?: string
}

export interface SettingsIconsProps {
  column: Column
  isOpen: boolean
}

export interface FilterViewsProps {
  definitions?: any[]
  columns?: any[]
  className?: string
}

export interface FilterColumnProps {
    definitions: AutoQueryConvention[]
    column: Column
    topLeft: { x:number, y:number }
    onDone?: OnDone
    onSave?: (settings:ColumnSettings) => void
}

export interface QueryPrefsProps {
    id?: string
    columns: MetadataPropertyType[]
    prefs: ApiPrefs
    maxLimit?: number
    onDone?: OnDone
    onSave?: (prefs:ApiPrefs) => void
}

export interface EnsureAccessProps {
  invalidAccess?: string
  alertClass?: string
  onDone?: OnDone
  children?: ReactNode
}

export interface EnsureAccessDialogProps {
  title?: string
  subtitle?: string
  invalidAccess?: string
  alertClass?: string
  onDone?: OnDone
}

export interface CloseButtonProps {
  buttonClass?: string
  title?: string
  onClose?: OnClose
}

export interface ModalLookupProps {
  id?: string
  refInfo: RefInfo
  skip?: number
  prefs?: ApiPrefs
  selectedColumns?:string[]|string

  allowFiltering?: boolean|null
  showPreferences?: boolean|null
  showPagingNav?: boolean|null
  showPagingInfo?: boolean|null
  showResetPreferences?: boolean|null
  showFiltersView?: boolean|null
  toolbarButtonClass?: string

  canFilter?:(column:string) => boolean

  type?: string|InstanceType<any>|Function
  modelTitle?: string
  newButtonLabel?: string
  configureField?: (field:InputProp) => void
  onDone?: (item:any) => void
}

export interface TabsProps {
    tabs: {[name:string]:ComponentType<any> }
    id?: string
    param?: string
    label?: (tab:string) => string
    selected?: string
    tabClass?: string
    bodyClass?: string
    url?:boolean
    clearQuery?:boolean
}

export interface SignInProps {
  provider?: string
  title?: string
  tabs?: boolean|"false"
  oauth?: boolean|"false"
  onLogin?: (auth:AuthenticateResponse) => void
}

export interface MarkdownInputProps {
  status?: ResponseStatus|null
  id: string
  inputClass?: string
  filterClass?:(cls:string) => string
  label?: string
  labelClass?: string
  help?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClose?: OnClose

  counter?: boolean
  rows?: number
  //rules
  errorMessages?: string[]
  lang?: string
  autoFocus?: boolean
  disabled?: boolean
  helpUrl?: string
  hide?: string|MarkdownInputOptions|MarkdownInputOptions[]
}

export interface SidebarLayoutRef {
  show(): void
  hide(): void
  toggle(show:boolean): void
}

export interface SidebarLayoutProps {
  children?: ReactNode
  className?: string
}

export interface DarkModeToggleProps {
  className?: string
}
