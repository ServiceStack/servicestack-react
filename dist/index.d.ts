import { ApiResult as ApiResult_2 } from '@servicestack/client';
import { CSSProperties } from 'react';
import { default as default_2 } from 'react';
import { JsonServiceClient } from '@servicestack/client';
import { JSX } from 'react/jsx-runtime';
import { MutableRefObject } from 'react';
import { ReactNode } from 'react';

declare const a: {
    blue: string;
    purple: string;
    red: string;
    green: string;
    sky: string;
    cyan: string;
    indigo: string;
};

export declare interface AdminDatabaseInfo {
    queryLimit: number;
    databases: DatabaseInfo[];
    meta: {
        [index: string]: string;
    };
}

export declare interface AdminRedisInfo {
    queryLimit: number;
    databases: number[];
    modifiableConnection?: boolean;
    endpoint: RedisEndpointInfo;
    meta: {
        [index: string]: string;
    };
}

export declare interface AdminUi {
    css: ApiCss;
}

export declare interface AdminUsersInfo {
    accessRole: string;
    enabled: string[];
    userAuth: MetadataType;
    allRoles: string[];
    allPermissions: string[];
    queryUserAuthProperties: string[];
    queryMediaRules: MediaRule[];
    formLayout: InputInfo[];
    css: ApiCss;
    meta: {
        [index: string]: string;
    };
}

export declare function Alert({ type, hideIcon, className, children }: AlertProps): JSX.Element;

export declare interface AlertProps {
    type?: "warn" | "info" | "error" | "success";
    hideIcon?: boolean;
    className?: string;
    children?: ReactNode;
}

export declare function AlertSuccess({ message, children }: AlertSuccessProps & {
    children?: React.ReactNode;
}): JSX.Element;

export declare interface AlertSuccessProps {
    message?: string;
}

export declare interface ApiCss {
    form: string;
    fieldset: string;
    field: string;
}

export declare interface ApiFormat {
    locale?: string;
    assumeUtc?: boolean;
    number?: FormatInfo;
    date?: FormatInfo;
}

/** Resolve Request DTO {MetadataOperationType} by name */
declare function apiOf(name: string): MetadataOperationType;

export declare type ApiPrefs = {
    take?: number;
    selectedColumns?: string[];
};

export declare interface ApiRequest {
    [k: string]: any;
    getTypeName(): string;
    getMethod(): string;
    createResponse(): any;
}

export declare interface ApiResponse {
    response?: any;
    error?: ResponseStatus;
    get completed(): boolean;
    get failed(): boolean;
    get succeeded(): boolean;
    get errorMessage(): string;
    get errorCode(): string;
    get errors(): ResponseError[];
    get errorSummary(): string;
}

export declare interface ApiResponseType {
    response?: any;
    error?: ResponseStatus;
}

export declare interface ApiResult<TResponse> extends ApiResponse {
    response?: TResponse;
    error?: ResponseStatus;
    get completed(): boolean;
    get failed(): boolean;
    get succeeded(): boolean;
    get errorMessage(): string;
    get errorCode(): string;
    get errors(): ResponseError[];
    get errorSummary(): string;
    fieldError(fieldName: string): ResponseError;
    fieldErrorMessage(fieldName: string): string;
    hasFieldError(fieldName: string): boolean;
    showSummary(exceptFields?: string[]): boolean;
    summaryMessage(exceptFields?: string[]): string;
    addFieldError(fieldName: string, message: string, errorCode?: string): void;
}

/** Capture AutoQuery APIs */
declare class Apis implements AutoQueryApis {
    Query?: MetadataOperationType;
    QueryInto?: MetadataOperationType;
    Create?: MetadataOperationType;
    Update?: MetadataOperationType;
    Patch?: MetadataOperationType;
    Delete?: MetadataOperationType;
    get AnyQuery(): MetadataOperationType;
    get AnyUpdate(): MetadataOperationType;
    get dataModel(): MetadataTypeName;
    toArray(): MetadataOperationType[];
    get empty(): boolean;
    add(op: MetadataOperationType): void;
    static from(ops: MetadataOperationType[]): Apis;
    static forType(type?: string | null, metaTypes?: MetadataTypes | null): Apis;
}

export declare type ApiState = {
    unRefs: <T extends Record<string, any>>(o: T) => T;
    setError: ({ message, errorCode, fieldName, errors }: IResponseStatus) => ResponseStatus;
    addFieldError: ({ fieldName, message, errorCode }: IResponseError) => void;
    loading: boolean;
    error: ResponseStatus | undefined;
    api: <TResponse>(request: IReturn<TResponse> | ApiRequest, args?: any, method?: string) => Promise<ApiResult<TResponse>>;
    apiVoid: (request: IReturnVoid | ApiRequest, args?: any, method?: string) => Promise<ApiResult<EmptyResponse>>;
    apiForm: <TResponse>(request: ApiRequest | IReturn<TResponse>, body: FormData, args?: any, method?: string) => Promise<ApiResult<TResponse>>;
    apiFormVoid: (request: IReturnVoid | ApiRequest, body: FormData, args?: any, method?: string) => Promise<ApiResult<EmptyResponse>>;
    swr: <TResponse>(request: IReturn<TResponse> | ApiRequest, fn: (r: ApiResult<TResponse>) => void, args?: any, method?: string) => Promise<ApiResult<TResponse>>;
    swrEffect: <TResponse>(requestFn: () => IReturn<TResponse> | ApiRequest, options?: {
        args?: any;
        method?: string;
        delayMs?: number;
    }) => ApiResult<TResponse>;
};

export declare interface ApiUiInfo {
    locodeCss: ApiCss;
    explorerCss: ApiCss;
    formLayout: InputInfo[];
    meta: {
        [index: string]: string;
    };
}

/** Format an API Response value */
declare function apiValueFmt(o: any, format?: FormatInfo | null, attrs?: any): any;

export declare interface AppInfo {
    baseUrl: string;
    serviceStackVersion: string;
    serviceName: string;
    apiVersion: string;
    serviceDescription: string;
    serviceIconUrl: string;
    brandUrl: string;
    brandImageUrl: string;
    textColor: string;
    linkColor: string;
    backgroundColor: string;
    backgroundImageUrl: string;
    iconUrl: string;
    jsTextCase: string;
    meta: {
        [index: string]: string;
    };
}

export declare interface AppMetadata {
    date: string;
    app: AppInfo;
    ui: UiInfo;
    config: ConfigInfo;
    contentTypeFormats: {
        [index: string]: string;
    };
    httpHandlers: {
        [index: string]: string;
    };
    plugins: PluginInfo;
    customPlugins: {
        [index: string]: CustomPluginInfo;
    };
    api: MetadataTypes;
    meta: {
        [index: string]: string;
    };
}

export declare interface AppTags {
    default: string;
    other: string;
}

/** Convert string dictionary to [{ key:string, value:string }] */
declare function asKvps(options?: {
    [k: string]: string;
} | null): KeyValuePair<string, string>[];

declare function asOptions(all: string[], exclude?: null | string | string[]): {
    [k: string]: boolean;
};

/** Resolve Absolute URL to use for relative paths */
declare function assetsPathResolver(src?: string): string;

declare function asStrings(o?: string | string[] | null): string[];

/** Format File attachment URL as an Attachment */
declare function attachment(url: string, attrs?: any): string;

export declare type AuthenticateResponse = {
    userId?: string;
    sessionId?: string;
    userName?: string;
    displayName?: string;
    referrerUrl?: string;
    bearerToken?: string;
    refreshToken?: string;
    profileUrl?: string;
    roles?: string[];
    permissions?: string[];
};

export declare interface AuthInfo {
    hasAuthSecret?: boolean;
    hasAuthRepository?: boolean;
    includesRoles?: boolean;
    includesOAuthTokens?: boolean;
    htmlRedirect: string;
    authProviders: MetaAuthProvider[];
    roleLinks: {
        [index: string]: LinkInfo[];
    };
    serviceRoutes: {
        [index: string]: string[];
    };
    meta: {
        [index: string]: string;
    };
}

export declare const Autocomplete: default_2.ForwardRefExoticComponent<AutocompleteProps & Omit<default_2.InputHTMLAttributes<HTMLInputElement>, keyof AutocompleteProps> & default_2.RefAttributes<AutocompleteRef>>;

export declare interface AutocompleteProps {
    status?: ResponseStatus | null;
    id: string;
    type?: string;
    label?: string;
    help?: string;
    placeholder?: string;
    multiple?: boolean;
    required?: boolean;
    options?: any[];
    value?: any;
    match: (item: any, value: string) => boolean;
    viewCount?: number;
    pageSize?: number;
    onChange?: (value: any[] | any) => void;
    children?: ((item: any) => ReactNode) | ReactNode;
}

declare interface AutocompleteRef {
    toggle(expand: boolean): void;
}

export declare const AutoCreateForm: default_2.ForwardRefExoticComponent<AutoCreateFormProps & AutoCreateFormSlots & default_2.RefAttributes<AutoCreateFormRef>>;

export declare interface AutoCreateFormProps extends AutoFormBaseProps {
}

declare interface AutoCreateFormRef {
    forceUpdate: () => void;
    props: AutoCreateFormProps;
    setModel: (args: any) => void;
    formFields: any;
    model: any;
}

declare interface AutoCreateFormSlots {
    heading?: ReactNode;
    subheading?: ReactNode;
    header?: (props: {
        formInstance: AutoCreateFormRef | null;
        model: any;
    }) => ReactNode;
    footer?: (props: {
        formInstance: AutoCreateFormRef | null;
        model: any;
    }) => ReactNode;
    children?: ReactNode;
}

export declare const AutoEditForm: default_2.ForwardRefExoticComponent<AutoEditFormProps & AutoEditFormSlots & default_2.RefAttributes<AutoEditFormRef>>;

export declare interface AutoEditFormProps extends AutoFormBaseProps {
    value: any;
    deleteType?: string | InstanceType<any> | Function;
    onDelete?: (response: any) => void;
}

declare interface AutoEditFormRef {
    forceUpdate: () => void;
    props: AutoEditFormProps;
    setModel: (args: any) => void;
    formFields: any;
    model: any;
}

declare interface AutoEditFormSlots {
    heading?: ReactNode;
    subheading?: ReactNode;
    header?: (props: {
        formInstance: AutoEditFormRef | null;
        model: any;
    }) => ReactNode;
    footer?: (props: {
        formInstance: AutoEditFormRef | null;
        model: any;
    }) => ReactNode;
    children?: ReactNode;
}

export declare const AutoForm: default_2.ForwardRefExoticComponent<AutoFormProps & AutoFormSlots & default_2.RefAttributes<AutoFormRef>>;

export declare interface AutoFormBaseProps {
    type: string | InstanceType<any> | Function;
    formStyle?: "slideOver" | "card";
    panelClass?: string;
    formClass?: string;
    headingClass?: string;
    subHeadingClass?: string;
    buttonsClass?: string;
    heading?: string;
    subHeading?: string;
    autosave?: boolean;
    showLoading?: boolean;
    showCancel?: boolean;
    configureField?: (field: InputProp) => void;
    configureFormLayout?: (field: InputProp[]) => void;
    onDone?: () => void;
    onSave?: (response: any) => void;
    onError?: (error: ResponseStatus) => void;
}

export declare const AutoFormFields: default_2.ForwardRefExoticComponent<AutoFormFieldsProps & default_2.RefAttributes<AutoFormFieldsRef>>;

export declare interface AutoFormFieldsProps {
    value: ApiRequest;
    type?: string;
    metaType?: MetadataType;
    api: {
        error?: ResponseStatus;
    } | null;
    formLayout?: InputInfo[];
    configureField?: (field: InputProp) => void;
    configureFormLayout?: (field: InputProp[]) => void;
    hideSummary?: boolean;
    flexClass?: string;
    divideClass?: string;
    spaceClass?: string;
    fieldsetClass?: string;
    onChange?: (value: any) => void;
}

declare interface AutoFormFieldsRef {
    forceUpdate: () => void;
    props: AutoFormFieldsProps;
    updateValue: (id: string, value: any) => void;
}

export declare interface AutoFormProps {
    type: string | InstanceType<any> | Function;
    value?: ApiRequest | any;
    heading?: string;
    subHeading?: string;
    showLoading?: boolean;
    jsconfig?: string;
    formStyle?: "slideOver" | "card";
    metaType?: MetadataType;
    configureField?: (field: InputProp) => void;
    configureFormLayout?: (field: InputProp[]) => void;
    panelClass?: string;
    bodyClass?: string;
    formClass?: string;
    innerFormClass?: string;
    headerClass?: string;
    buttonsClass?: string;
    headingClass?: string;
    subHeadingClass?: string;
    submitLabel?: string;
    allowSubmit?: (model: any) => boolean;
    onSuccess?: (response: any) => void;
    onError?: (error: ResponseStatus) => void;
    onDone?: () => void;
    onChange?: (value: any) => void;
}

declare interface AutoFormRef {
    forceUpdate: () => void;
    props: AutoFormProps;
    setModel: (args: any) => Promise<void>;
    formFields: any;
    submit: () => Promise<void>;
    close: () => void;
    model: any;
}

declare interface AutoFormSlots {
    heading?: ReactNode;
    subheading?: ReactNode;
    header?: (props: {
        instance: AutoFormRef | null;
        model: any;
    }) => ReactNode;
    footer?: (props: {
        instance: AutoFormRef | null;
        model: any;
    }) => ReactNode;
    buttons?: ReactNode;
    leftbuttons?: (props: {
        instance: AutoFormRef | null;
        model: any;
    }) => ReactNode;
    rightbuttons?: (props: {
        instance: AutoFormRef | null;
        model: any;
    }) => ReactNode;
}

export declare interface AutoQueryApis {
    Query?: MetadataOperationType;
    QueryInto?: MetadataOperationType;
    Create?: MetadataOperationType;
    Update?: MetadataOperationType;
    Patch?: MetadataOperationType;
    Delete?: MetadataOperationType;
}

export declare interface AutoQueryConvention {
    name: string;
    value: string;
    types?: string;
    valueType?: string;
}

export declare const AutoQueryGrid: default_2.ForwardRefExoticComponent<AutoQueryGridComponentProps & default_2.RefAttributes<AutoQueryGridRef>>;

declare interface AutoQueryGridComponentProps extends AutoQueryGridProps {
    onHeaderSelected?: (name: string, e: default_2.MouseEvent) => void;
    onRowSelected?: (item: any, ev: default_2.MouseEvent) => void;
    onNav?: (args: any) => void;
    children?: ReactNode;
    toolbar?: ReactNode;
    toolbarButtons?: (props: {
        toolbarButtonClass: string;
    }) => ReactNode;
    createForm?: (props: {
        type: string;
        configure: (field: any) => void;
        done: () => void;
        save: () => Promise<void>;
    }) => ReactNode;
    editForm?: (props: {
        model: any;
        type: string;
        deleteType: string | null;
        configure: (field: any) => void;
        done: () => void;
        save: () => Promise<void>;
    }) => ReactNode;
    viewForm?: (props: {
        model: any;
        apis: Apis;
        done: () => void;
    }) => ReactNode;
    formHeader?: (props: {
        form: 'create' | 'edit';
        formInstance: any;
        apis: Apis;
        type?: string;
        model?: any;
        id?: any;
        updateModel: (props: any) => void;
    }) => ReactNode;
    formFooter?: (props: {
        form: 'create' | 'edit';
        formInstance: any;
        apis: Apis;
        type?: string;
        model?: any;
        id?: any;
        updateModel: (props: any) => void;
    }) => ReactNode;
    columnSlots?: Record<string, (props: any) => ReactNode>;
    headerSlots?: Record<string, (props: any) => ReactNode>;
}

export declare type AutoQueryGridDefaults = {
    deny?: GridAllowOptions[];
    hide?: GridShowOptions[];
    toolbarButtonClass?: string;
    tableStyle?: TableStyleOptions;
    take?: number;
    maxFieldLength?: number;
};

export declare interface AutoQueryGridProps {
    filterDefinitions?: AutoQueryConvention[];
    id?: string;
    apis?: string | string[];
    type?: string | InstanceType<any> | Function;
    prefs?: ApiPrefs;
    deny?: string | GridAllowOptions | GridAllowOptions[];
    hide?: string | GridShowOptions | GridShowOptions[];
    selectedColumns?: string[] | string;
    toolbarButtonClass?: string;
    tableStyle?: TableStyleOptions;
    gridClass?: string;
    grid2Class?: string;
    grid3Class?: string;
    grid4Class?: string;
    tableClass?: string;
    theadClass?: string;
    tbodyClass?: string;
    theadRowClass?: string;
    theadCellClass?: string;
    headerTitle?: (name: string) => string;
    headerTitles?: {
        [name: string]: string;
    };
    visibleFrom?: {
        [name: string]: Breakpoint | "never";
    };
    rowClass?: (model: any, i: number) => string;
    rowStyle?: (model: any, i: number) => CSSProperties | undefined;
    modelTitle?: string;
    newButtonLabel?: string;
    apiPrefs?: ApiPrefs;
    canFilter?: (column: string) => boolean;
    disableKeyBindings?: (column: string) => boolean;
    configureField?: (field: InputProp) => void;
    skip?: number;
    create?: boolean;
    edit?: string | number;
    filters?: any;
    onHeaderSelected?: (name: string, ev: React.MouseEvent) => void;
    onRowSelected?: (item: any, ev: React.MouseEvent) => void;
    onNav?: (args: any) => void;
}

declare interface AutoQueryGridRef {
    update: () => Promise<void>;
    search: (args: any) => Promise<void>;
    createRequestArgs: () => Record<string, any>;
    reset: () => void;
    createDone: () => void;
    createSave: () => Promise<void>;
    editDone: () => void;
    editSave: () => Promise<void>;
    forceUpdate: () => void;
    setEdit: (props: any) => void;
    edit: any;
    createForm: any;
    editForm: any;
    apiPrefs: ApiPrefs;
    results: any[];
    skip: number;
    take: number;
    total: number;
}

export declare interface AutoQueryInfo {
    maxLimit?: number;
    untypedQueries?: boolean;
    rawSqlFilters?: boolean;
    autoQueryViewer?: boolean;
    async?: boolean;
    orderByPrimaryKey?: boolean;
    crudEvents?: boolean;
    crudEventsServices?: boolean;
    accessRole: string;
    namedConnection: string;
    viewerConventions: AutoQueryConvention[];
    meta: {
        [index: string]: string;
    };
}

export declare const AutoViewForm: default_2.FC<AutoViewFormProps & AutoViewFormSlots>;

export declare interface AutoViewFormProps {
    model: any;
    apis?: Apis;
    typeName?: string;
    done?: Function;
    formStyle?: "slideOver" | "card";
    panelClass?: string;
    formClass?: string;
    headingClass?: string;
    subHeadingClass?: string;
    heading?: string;
    subHeading?: string;
    showLoading?: boolean;
    deleteType?: string | InstanceType<any> | Function;
    onDone?: () => void;
    onSave?: (response: any) => void;
    onDelete?: (response: any) => void;
    onError?: (error: ResponseStatus) => void;
}

declare interface AutoViewFormSlots {
    heading?: ReactNode;
    subheading?: ReactNode;
}

export declare function Breadcrumb({ href, title, children }: BreadcrumbProps): JSX.Element;

export declare interface BreadcrumbProps {
    href?: string;
    title?: string;
    children?: ReactNode;
}

export declare function Breadcrumbs({ homeHref, homeLabel, children }: BreadcrumbsProps): JSX.Element;

export declare interface BreadcrumbsProps {
    homeHref?: string;
    homeLabel?: string;
    children?: ReactNode;
}

export declare type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/** Format number in human readable disk size */
declare function bytes(val: number, attrs?: any): string;

/** Check if Auth Session has access to API */
declare function canAccess(op?: MetadataOperationType | null): boolean;

/** Check if path or URI is of a supported web image type */
declare function canPreview(path: string): boolean;

declare const card: {
    panelClass: string;
    formClass: string;
    headingClass: string;
    subHeadingClass: string;
};

export declare function CellFormat(props: CellFormatProps): JSX.Element;

export declare interface CellFormatProps {
    type: MetadataType;
    propType: MetadataPropertyType;
    value: Object;
}

export declare const CheckboxInput: default_2.FC<CheckboxInputProps & default_2.HTMLAttributes<HTMLInputElement>>;

export declare interface CheckboxInputProps {
    value?: boolean;
    status?: ResponseStatus;
    id: string;
    inputClass?: string;
    filterClass?: (cls: string) => string;
    label?: string;
    labelClass?: string;
    help?: string;
    onChange?: (value: boolean) => void;
}

/** Delete AppMetadata and remove from localStorage */
declare function clearMetadata(): void;

export declare function CloseButton({ buttonClass, title, onClose }: CloseButtonProps): JSX.Element;

export declare interface CloseButtonProps {
    buttonClass?: string;
    title?: string;
    onClose?: () => void;
}

export declare type Column = {
    name: string;
    type: string;
    meta: MetadataPropertyType;
    settings: ColumnSettings;
    fieldName?: string;
    headerClass?: string;
    cellClass?: string;
    title?: string;
    format?: string;
    visibleFrom?: Breakpoint;
};

export declare type ColumnSettings = {
    filters: Filter[];
    sort?: "ASC" | "DESC";
};

export declare const Combobox: default_2.ForwardRefExoticComponent<ComboboxProps & Omit<default_2.HTMLAttributes<HTMLDivElement>, keyof ComboboxProps> & default_2.RefAttributes<ComboboxRef>>;

export declare interface ComboboxProps {
    id: string;
    value?: any;
    multiple?: boolean;
    options?: any;
    values?: string[];
    entries?: {
        key: string;
        value: string;
    }[];
    onChange?: (value: any[] | any) => void;
    children?: ((item: any) => ReactNode) | ReactNode;
}

export declare interface ComboboxRef {
    toggle(expand: boolean): void;
}

export declare interface ConfigInfo {
    debugMode?: boolean;
    meta: {
        [index: string]: string;
    };
}

export declare const ConfirmDelete: default_2.FC<ConfirmDeleteComponentProps>;

declare interface ConfirmDeleteComponentProps extends ConfirmDeleteProps {
    children?: default_2.ReactNode;
    className?: string;
    [key: string]: any;
}

export declare interface ConfirmDeleteProps {
    onDelete?: () => void;
}

declare function copyText(text: string): void;

declare function createDebounce(fn: Function, delayMs?: number): (...args: any[]) => void;

/** Create a Request DTO instance for Request DTO name or MetadataOperationType */
declare function createDto(requestDto: string | MetadataOperationType, obj?: any): any;

/** Create Form Layout's {InputProp[]} from {MetadataType} */
declare function createFormLayout(metaType?: MetadataType | null): InputProp[];

declare namespace css {
    export {
        filterClass,
        a,
        input,
        card,
        slideOver,
        modal,
        form,
        grid,
        dummy
    }
}
export { css }

/** Format number as Currency */
declare function currency(val: number, attrs?: any): string;

export declare interface CustomPluginInfo {
    accessRole: string;
    serviceRoutes: {
        [index: string]: string[];
    };
    enabled: string[];
    meta: {
        [index: string]: string;
    };
}

export declare function DarkModeToggle(): JSX.Element;

export declare interface DatabaseInfo {
    alias: string;
    name: string;
    schemas: SchemaInfo[];
}

export declare function DataGrid({ id, items, tableStyle, type, selectedColumns, className, gridClass: gridClassProp, grid2Class: grid2ClassProp, grid3Class: grid3ClassProp, grid4Class: grid4ClassProp, tableClass: tableClassProp, theadClass: theadClassProp, tbodyClass: tbodyClassProp, theadRowClass: theadRowClassProp, theadCellClass: theadCellClassProp, isSelected, headerTitle, headerTitles, visibleFrom, rowClass, rowStyle, onHeaderSelected, onRowSelected, children, }: DataGridProps & {
    children?: default_2.ReactNode;
}): JSX.Element;

export declare interface DataGridProps {
    items: any[];
    id?: string;
    type?: string | InstanceType<any> | Function;
    tableStyle?: TableStyleOptions;
    selectedColumns?: string[] | string;
    className?: string;
    gridClass?: string;
    grid2Class?: string;
    grid3Class?: string;
    grid4Class?: string;
    tableClass?: string;
    theadClass?: string;
    tbodyClass?: string;
    theadRowClass?: string;
    theadCellClass?: string;
    isSelected?: (row: any) => boolean;
    headerTitle?: (name: string) => string;
    headerTitles?: {
        [name: string]: string;
    };
    visibleFrom?: {
        [name: string]: Breakpoint | "never";
    };
    rowClass?: (model: any, i: number) => string;
    rowStyle?: (model: any, i: number) => CSSProperties | undefined;
    onHeaderSelected?: (name: string, ev: React.MouseEvent) => void;
    onRowSelected?: (item: any, ev: React.MouseEvent) => void;
}

/** Format Date into required input[type=date] format */
declare function dateInputFormat(value: Date | string | Object): string;

declare function dateTimeInputFormat(value: Date | string | Object): string;

declare type DefaultFormats = ApiFormat & {
    maxFieldLength?: number;
    maxNestedFields?: number;
    maxNestedFieldLength?: number;
};

declare function delay(ms: number): Promise<unknown>;

declare const dummy: {
    colspans: string;
};

export declare const DynamicInput: default_2.FC<DynamicInputProps>;

export declare interface DynamicInputProps {
    input: InputProp | InputInfo;
    value: ApiRequest;
    api: ApiResponseType | null;
    onChange?: (value: any) => void;
}

export declare interface EmptyResponse {
    responseStatus?: ResponseStatus;
}

/** Encode SVG XML for usage in Data URIs */
declare function encodeSvg(s: string): string;

export declare function EnsureAccess({ invalidAccess, alertClass, children }: EnsureAccessProps): JSX.Element;

export declare function EnsureAccessDialog({ title, subtitle, invalidAccess, alertClass, onDone }: EnsureAccessDialogProps): JSX.Element;

export declare interface EnsureAccessDialogProps {
    title?: string;
    subtitle?: string;
    invalidAccess?: string;
    alertClass?: string;
    onDone?: () => void;
}

export declare interface EnsureAccessProps {
    invalidAccess?: string;
    alertClass?: string;
    children?: ReactNode;
    onDone?: () => void;
}

/** Format Enum Flags into expanded enum strings */
declare function enumFlags(value: number, options: any): string;

declare function enumFlagsConverter(type: string): (x: number | any) => any;

/** Resolve Enum entries for Enum Type by name */
declare function enumOptions(name: string): {
    [name: string]: string;
};

export declare interface ErrorResponse {
    responseStatus?: ResponseStatus;
}

export declare function ErrorSummary({ status, except, className }: ErrorSummaryProps): JSX.Element;

export declare interface ErrorSummaryProps {
    status?: ResponseStatus | undefined;
    except?: string | string[];
    className?: string;
}

declare function expandEnumFlags(value: number, options: any): any[];

export declare interface ExplorerUi {
    css: ApiCss;
    tags: AppTags;
}

/** Resolve SVG URI for file extension */
declare function extSrc(ext: string): string;

/** Resolve SVG XML for file extension */
declare function extSvg(ext: string): string;

/** Resolve fallback URL to use if primary URL fails */
declare function fallbackPathResolver(src?: string): string;

export declare interface FieldCss {
    field: string;
    input: string;
    label: string;
}

/** Resolve image preview URL for file */
declare function fileImageUri(file: any | {
    name: string;
}): string;

export declare const FileInput: default_2.FC<FileInputProps & Omit<default_2.InputHTMLAttributes<HTMLInputElement>, keyof FileInputProps>>;

export declare interface FileInputProps {
    multiple?: boolean;
    status?: ResponseStatus | null;
    id: string;
    inputClass?: string;
    filterClass?: (cls: string) => string;
    label?: string;
    labelClass?: string;
    help?: string;
    placeholder?: string;
    value?: string;
    values?: string[];
    files?: UploadedFile[];
    onChange?: (value: string) => void;
}

/** Resolve the Icon URI to use for file */
declare function filePathUri(path?: string): string;

export declare interface FilesUploadInfo {
    basePath: string;
    locations: FilesUploadLocation[];
    meta: {
        [index: string]: string;
    };
}

export declare interface FilesUploadLocation {
    name: string;
    readAccessRole: string;
    writeAccessRole: string;
    allowExtensions: string[];
    allowOperations: string;
    maxFileCount?: number;
    minFileBytes?: number;
    maxFileBytes?: number;
}

export declare type Filter = {
    key: string;
    name: string;
    value: string;
    values?: string[];
};

declare function filterClass(cls: (string | undefined)[], type: string, fn?: ((cls: string) => string)): string;

export declare function FilterColumn({ definitions, column, topLeft, onDone, onSave }: FilterColumnProps): JSX.Element;

export declare interface FilterColumnProps {
    definitions: AutoQueryConvention[];
    column: Column;
    topLeft: {
        x: number;
        y: number;
    };
    onDone?: () => void;
    onSave?: (settings: ColumnSettings) => void;
}

export declare function FilterViews({ definitions, columns, className, onDone, onChange }: FilterViewsProps_2): JSX.Element;

export declare interface FilterViewsProps {
    definitions?: any[];
    columns?: any[];
}

declare interface FilterViewsProps_2 {
    definitions: AutoQueryConvention[];
    columns: Column[];
    className?: string;
    onDone?: () => void;
    onChange?: (column: Column) => void;
}

/** Filter Apis by different filtering conditions */
declare function findApis({ dataModel }: {
    dataModel?: string | MetadataType;
}): MetadataOperationType[];

/** Release all tracked Object URLs */
declare function flush(): void;

/** Set focus to the next element inside a HTML Form */
declare function focusNextElement(opt?: {
    after?: HTMLInputElement;
}): void;

declare const form: {
    panelClass(style?: FormStyle): string;
    formClass(style?: FormStyle): string;
    headingClass(style?: FormStyle): string;
    subHeadingClass(style?: FormStyle): string;
    buttonsClass: string;
    legendClass: string;
};

/** Format file size in human readable bytes */
declare function formatBytes(bytes: number, d?: number): string;

/** Format as Date */
declare function formatDate(d: Date | string | number, attrs?: any): string;

export declare interface FormatInfo {
    method: string;
    options?: string;
    locale?: string;
}

/** Format as Number */
declare function formatNumber(n: number, attrs?: any): string;

/** Available format methods to use in <PreviewFormat /> */
declare class Formats {
    static currency: FormatInfo;
    static bytes: FormatInfo;
    static link: FormatInfo;
    static linkTel: FormatInfo;
    static linkMailTo: FormatInfo;
    static icon: FormatInfo;
    static iconRounded: FormatInfo;
    static attachment: FormatInfo;
    static time: FormatInfo;
    static relativeTime: FormatInfo;
    static relativeTimeFromMs: FormatInfo;
    static date: FormatInfo;
    static number: FormatInfo;
    static hidden: FormatInfo;
    static enumFlags: FormatInfo;
}

declare function formatter(format: FormatInfo): Function;

/** Format any value or object graph */
declare function formatValue(value: any, format?: FormatInfo | null, attrs?: any): any;

export declare const FormLoading: default_2.FC<FormLoadingProps>;

export declare interface FormLoadingProps {
    icon?: boolean;
    text?: string;
}

export declare type FormStyle = "slideOver" | "card";

/** Convert HTML Input values to supported DTO values */
declare function formValues(form: HTMLFormElement, props?: MetadataPropertyType[]): {
    [k: string]: any;
};

declare function fromCache(key: string): any;

/** Resolve File extension from file name or path */
declare function getExt(path?: string | null): string;

/** Resolve file name from /file/path */
declare function getFileName(path?: string | null): string;

declare function getFormatters(): {
    [k: string]: Function;
};

/** Resolve Primary Key value from {MetadataType} and row instance  */
declare function getId(type: MetadataType, row: any): any;

/** Get get AppMetadata instance */
declare function getMetadata(opt?: {
    assert?: boolean;
}): any;

/** Resolve the MIME type for a file path name or extension */
declare function getMimeType(fileNameOrExt: string): string;

/** Resolve PrimaryKey {MetadataPropertyType} for {MetadataType} */
declare function getPrimaryKey(type?: MetadataType | null): MetadataPropertyType;

declare function getPrimaryKeyByProps(type: MetadataType, props: MetadataPropertyType[]): MetadataPropertyType | null;

/** Resolve Request DTO name from a Request DTO instance */
declare function getTypeName(type?: string | InstanceType<any> | Function): string;

declare const grid: {
    getGridClass(style?: TableStyleOptions): string;
    getGrid2Class(style?: TableStyleOptions): string;
    getGrid3Class(style?: TableStyleOptions): string;
    getGrid4Class(style?: TableStyleOptions): string;
    getTableClass(style?: TableStyleOptions): string;
    getTheadClass(style?: TableStyleOptions): string;
    getTheadRowClass(style?: TableStyleOptions): string;
    getTheadCellClass(style?: TableStyleOptions): string;
    getTbodyClass(style?: TableStyleOptions): string;
    getTableRowClass(style: TableStyleOptions, i: number, selected: boolean, allowSelection: boolean): string;
    gridClass: string;
    grid2Class: string;
    grid3Class: string;
    grid4Class: string;
    tableClass: string;
    theadClass: string;
    tableCellClass: string;
    theadRowClass: string;
    theadCellClass: string;
    toolbarButtonClass: string;
};

export declare type GridAllowOptions = "filtering" | "queryString" | "queryFilters";

export declare type GridShowOptions = "toolbar" | "preferences" | "pagingNav" | "pagingInfo" | "downloadCsv" | "refresh" | "copyApiUrl" | "resetPreferences" | "filtersView" | "newItem" | "forms";

/** Check if the Authenticated User has a specific permission */
declare function hasPermission(permission: string): boolean;

/** Check if the Authenticated User has a specific role */
declare function hasRole(role: string): boolean;

/** Format as empty string */
declare function hidden(o: any): string;

/** Convert object dictionary into encoded HTML attributes */
declare function htmlAttrs(attrs: any): string;

export declare function HtmlFormat(props: HtmlFormatProps): JSX.Element;

export declare interface HtmlFormatProps {
    value?: any;
    depth?: number;
    fieldAttrs?: (k: string) => any;
    classes?: (type: 'object' | 'array', tag: 'div' | 'table' | 'thead' | 'th' | 'tr' | 'td', depth: number, cls: string, index?: number) => string;
}

/** HTML Tag builder */
declare function htmlTag(tag: string, child?: string, attrs?: any): string;

/** Format human readable ms */
declare function humanifyMs(ms: number): string;

/** Format human readable number */
declare function humanifyNumber(n: number): string;

export declare function Icon({ image, svg, src, alt, type, className }: IconProps): JSX.Element;

/** Format Image URL as an Icon */
declare function icon(url: string, attrs?: any): string;

/** Resolve the fallback URL for a broken Image URL */
declare function iconFallbackSrc(src: string, fallbackSrc?: string): string;

/** Error handler for broken images to return a fallbackSrc */
declare function iconOnError(img: HTMLImageElement, fallbackSrc?: string): void;

export declare interface IconProps {
    image?: ImageInfo;
    svg?: string;
    src?: string;
    alt?: string;
    type?: string;
    className?: string;
}

/** Format Image URL as a full rounded Icon */
declare function iconRounded(url: string, attrs?: any): string;

export declare interface ImageInfo {
    svg?: string;
    uri?: string;
    alt?: string;
    cls?: string;
}

/** Only indent json */
declare function indentJson(o: any, space?: number): string;

declare const input: {
    base: string;
    invalid: string;
    valid: string;
};

export declare function InputDescription({ id, description }: InputDescriptionProps): JSX.Element;

export declare interface InputDescriptionProps {
    id: string;
    description: string;
}

/** Resolve file metadata for all uploaded HTML file input files */
declare function inputFiles(input: HTMLInputElement): {
    fileName: string;
    contentLength: number;
    filePath: string;
}[];

export declare interface InputInfo {
    id: string;
    name?: string;
    type: string;
    value?: string;
    placeholder?: string;
    help?: string;
    label?: string;
    title?: string;
    size?: string;
    pattern?: string;
    readOnly?: boolean;
    required?: boolean;
    disabled?: boolean;
    autocomplete?: string;
    autofocus?: string;
    min?: string;
    max?: string;
    step?: number;
    minLength?: number;
    maxLength?: number;
    accept?: string;
    capture?: string;
    multiple?: boolean;
    allowableValues?: string[];
    allowableEntries?: KeyValuePair<string, string>[];
    options?: string;
    ignore?: boolean;
    css?: FieldCss;
    meta?: {
        [index: string]: string;
    };
}

export declare interface InputProp extends InputInfo {
    prop?: MetadataPropertyType;
    op?: MetadataOperationType;
}

declare interface InsertOptions {
    selectionAtEnd?: boolean;
    offsetStart?: number;
    offsetEnd?: number;
    filterValue?: (value: string, opt: any) => string;
    filterSelection?: (selection: string) => string;
}

/** Return error message if Authenticated User cannot access API */
declare function invalidAccessMessage(op: MetadataOperationType): string;

export declare interface IResponseError {
    errorCode?: string;
    fieldName?: string;
    message?: string;
}

export declare interface IResponseStatus extends IResponseError {
    errors?: ResponseError[];
}

export declare interface IReturn<T> {
    createResponse(): T;
}

export declare interface IReturnVoid {
    createResponse(): any;
}

/** Check if the Authenticated User has the Admin role */
declare function isAdmin(): boolean;

declare function isComplexProp(prop?: MetadataPropertyType): boolean;

/** Check if value is a non-scalar type */
declare function isComplexType(value: any): boolean;

/** Check if value is a scalar type */
declare function isPrimitive(value: any): boolean;

declare interface Item {
    value: string;
    selectionStart?: number;
    selectionEnd?: number;
}

export declare interface KeyValuePair<TKey, TValue> {
    key: TKey;
    value: TValue;
}

/** Format URL as <a> link */
declare function link(href: string, opt?: {
    cls?: string;
    target?: string;
    rel?: string;
}): string;

/** Convert HTML Anchor attributes into encoded HTML attributes */
declare function linkAttrs(attrs: {
    href: string;
    cls?: string;
    target?: string;
    rel?: string;
}): {
    target: string;
    rel: string;
    class: string;
} & {
    href: string;
    cls?: string;
    target?: string;
    rel?: string;
};

export declare interface LinkInfo {
    id: string;
    href: string;
    label: string;
    icon: ImageInfo;
    show: string;
    hide: string;
}

/** Format email as <a> mailto: link */
declare function linkMailTo(email: string, opt?: {
    subject?: string;
    body?: string;
    cls?: string;
    target?: string;
    rel?: string;
}): string;

/** Format Phone Number as <a> tel: link */
declare function linkTel(tel: string, opt?: {
    cls?: string;
    target?: string;
    rel?: string;
}): string;

export declare function Loading({ imageClass, className, children }: LoadingProps): JSX.Element;

export declare interface LoadingProps {
    imageClass?: string;
    className?: string;
    children?: ReactNode;
}

export declare interface LocodeUi {
    css: ApiCss;
    tags: AppTags;
    maxFieldLength: number;
    maxNestedFields: number;
    maxNestedFieldLength: number;
}

export declare const LookupInput: default_2.FC<LookupInputProps>;

export declare interface LookupInputProps {
    id?: string;
    status?: ResponseStatus | null;
    input: InputProp | InputInfo;
    metadataType: MetadataType;
    value: any;
    label?: string;
    labelClass?: string;
    help?: string;
    onChange?: (value: any) => void;
}

/** Create a Request DTO instance for Request DTO name */
declare function makeDto(requestDto: string, obj?: any, ctx?: {
    createResponse?: () => any;
    method?: string;
}): any;

export declare const MarkdownInput: default_2.ForwardRefExoticComponent<MarkdownInputProps & default_2.RefAttributes<MarkdownInputRef>>;

export declare type MarkdownInputOptions = "bold" | "italics" | "link" | "image" | "blockquote" | "code" | "heading" | "orderedList" | "unorderedList" | "strikethrough" | "undo" | "redo" | "help";

export declare interface MarkdownInputProps {
    status?: ResponseStatus | null;
    id: string;
    inputClass?: string;
    filterClass?: (cls: string) => string;
    label?: string;
    labelClass?: string;
    help?: string;
    placeholder?: string;
    value?: string;
    counter?: boolean;
    rows?: number;
    errorMessages?: string[];
    lang?: string;
    autoFocus?: boolean;
    disabled?: boolean;
    helpUrl?: string;
    hide?: string | MarkdownInputOptions | MarkdownInputOptions[];
    onChange?: (value: string) => void;
    onClose?: () => void;
}

declare interface MarkdownInputRef {
    textarea: default_2.RefObject<HTMLTextAreaElement>;
    updateModelValue: (value: string) => void;
    selection: () => string;
    hasSelection: () => boolean;
    selectionInfo: () => any;
    insert: (prefix: string, suffix: string, placeholder?: string, options?: InsertOptions) => void;
    replace: (item: Item) => void;
}

export declare function MarkupFormat(props: MarkupFormatProps): JSX.Element;

export declare interface MarkupFormatProps {
    value: any;
    imageClass?: string;
}

export declare function MarkupModel(props: MarkupModelProps): JSX.Element;

export declare interface MarkupModelProps {
    value: any;
    imageClass?: string;
}

export declare interface MediaRule {
    size: string;
    rule: string;
    applyTo: string[];
    meta: {
        [index: string]: string;
    };
}

export declare interface MetaAuthProvider {
    name: string;
    label: string;
    type: string;
    navItem: NavItem;
    icon: ImageInfo;
    formLayout: InputInfo[];
    meta: {
        [index: string]: string;
    };
}

export declare class MetadataApp implements IReturn<AppMetadata> {
    view?: string;
    includeTypes?: string[];
    constructor(init?: Partial<MetadataApp>);
    getTypeName(): string;
    getMethod(): string;
    createResponse(): AppMetadata;
}

export declare interface MetadataAttribute {
    name: string;
    constructorArgs: MetadataPropertyType[];
    args: MetadataPropertyType[];
}

export declare interface MetadataDataContract {
    name: string;
    namespace: string;
}

export declare interface MetadataDataMember {
    name: string;
    order?: number;
    isRequired?: boolean;
    emitDefaultValue?: boolean;
}

export declare interface MetadataOperationType {
    request: MetadataType;
    response: MetadataType;
    actions: string[];
    returnsVoid?: boolean;
    method: string;
    returnType: MetadataTypeName;
    routes: MetadataRoute[];
    dataModel: MetadataTypeName;
    viewModel: MetadataTypeName;
    requiresAuth?: boolean;
    requiredRoles: string[];
    requiresAnyRole: string[];
    requiredPermissions: string[];
    requiresAnyPermission: string[];
    tags: string[];
    ui: ApiUiInfo;
}

export declare interface MetadataPropertyType {
    name: string;
    type: string;
    namespace?: string;
    isValueType?: boolean;
    isEnum?: boolean;
    isPrimaryKey?: boolean;
    genericArgs?: string[];
    value?: string;
    description?: string;
    dataMember?: MetadataDataMember;
    readOnly?: boolean;
    paramType?: string;
    displayType?: string;
    isRequired?: boolean;
    allowableValues?: string[];
    allowableMin?: number;
    allowableMax?: number;
    attributes?: MetadataAttribute[];
    uploadTo?: string;
    input?: InputInfo;
    format?: FormatInfo;
    ref?: RefInfo;
}

export declare interface MetadataRoute {
    path: string;
    verbs: string;
    notes: string;
    summary: string;
}

export declare interface MetadataType {
    name: string;
    namespace?: string;
    genericArgs?: string[];
    inherits?: MetadataTypeName;
    implements?: MetadataTypeName[];
    displayType?: string;
    description?: string;
    notes?: string;
    icon?: ImageInfo;
    isNested?: boolean;
    isEnum?: boolean;
    isEnumInt?: boolean;
    isInterface?: boolean;
    isAbstract?: boolean;
    dataContract?: MetadataDataContract;
    properties?: MetadataPropertyType[];
    attributes?: MetadataAttribute[];
    innerTypes?: MetadataTypeName[];
    enumNames?: string[];
    enumValues?: string[];
    enumMemberValues?: string[];
    enumDescriptions?: string[];
    meta?: {
        [index: string]: string;
    };
}

export declare interface MetadataTypeName {
    name: string;
    namespace: string;
    genericArgs: string[];
}

export declare interface MetadataTypes {
    config: MetadataTypesConfig;
    namespaces: string[];
    types: MetadataType[];
    operations: MetadataOperationType[];
}

export declare interface MetadataTypesConfig {
    baseUrl: string;
    usePath: string;
    makePartial: boolean;
    makeVirtual: boolean;
    makeInternal: boolean;
    baseClass: string;
    package: string;
    addReturnMarker: boolean;
    addDescriptionAsComments: boolean;
    addDataContractAttributes: boolean;
    addIndexesToDataMembers: boolean;
    addGeneratedCodeAttributes: boolean;
    addImplicitVersion?: number;
    addResponseStatus: boolean;
    addServiceStackTypes: boolean;
    addModelExtensions: boolean;
    addPropertyAccessors: boolean;
    excludeGenericBaseTypes: boolean;
    settersReturnThis: boolean;
    makePropertiesOptional: boolean;
    exportAsTypes: boolean;
    excludeImplementedInterfaces: boolean;
    addDefaultXmlNamespace: string;
    makeDataContractsExtensible: boolean;
    initializeCollections: boolean;
    addNamespaces: string[];
    defaultNamespaces: string[];
    defaultImports: string[];
    includeTypes: string[];
    excludeTypes: string[];
    exportTags: string[];
    treatTypesAsStrings: string[];
    exportValueTypes: boolean;
    globalNamespace: string;
    excludeNamespace: boolean;
    dataClass: string;
    dataClassJson: string;
    ignoreTypes: string[];
    exportTypes: string[];
    exportAttributes: string[];
    ignoreTypesInNamespaces: string[];
}

declare const modal: {
    modalClass: string;
    sizeClass: string;
};

export declare function ModalDialog({ id, modalClass, sizeClass, closeButtonClass, configureField, children, onDone }: ModalDialogProps & {
    closeButton?: ReactNode;
    bottom?: ReactNode;
}): JSX.Element;

export declare interface ModalDialogProps {
    id?: string;
    modalClass?: string;
    sizeClass?: string;
    closeButtonClass?: string;
    configureField?: (field: InputProp) => void;
    children?: ReactNode;
    onDone?: () => void;
}

export declare function ModalLookup({ id, refInfo, skip: initialSkip, prefs, selectedColumns: propSelectedColumns, allowFiltering, showPreferences, showPagingNav, showPagingInfo, showResetPreferences, showFiltersView, toolbarButtonClass: propToolbarButtonClass, canFilter: propCanFilter, modelTitle: propModelTitle, newButtonLabel: propNewButtonLabel, configureField, onDone }: ModalLookupProps): JSX.Element;

export declare interface ModalLookupProps {
    id?: string;
    refInfo: RefInfo;
    skip?: number;
    prefs?: ApiPrefs;
    selectedColumns?: string[] | string;
    allowFiltering?: boolean | null;
    showPreferences?: boolean | null;
    showPagingNav?: boolean | null;
    showPagingInfo?: boolean | null;
    showResetPreferences?: boolean | null;
    showFiltersView?: boolean | null;
    toolbarButtonClass?: string;
    canFilter?: (column: string) => boolean;
    type?: string | InstanceType<any> | Function;
    modelTitle?: string;
    newButtonLabel?: string;
    configureField?: (field: InputProp) => void;
    onDone?: (item: any) => void;
}

export declare type ModalProvider = {
    openModal: (info: {
        name: string;
    } & any, done: (result: any) => any) => void;
};

export declare interface NavItem {
    label: string;
    href: string;
    exact?: boolean;
    id: string;
    className: string;
    iconClass: string;
    iconSrc: string;
    show: string;
    hide: string;
    children: NavItem[];
    meta: {
        [index: string]: string;
    };
}

export declare function NavList({ title, children }: NavListProps): JSX.Element;

export declare function NavListItem({ title, href, icon, iconSvg, iconSrc, iconAlt, children }: NavListItemProps & {
    children?: React.ReactNode;
}): JSX.Element;

export declare interface NavListItemProps {
    title: string;
    href: string;
    icon?: ImageInfo;
    iconSvg?: string;
    iconSrc?: string;
    iconAlt?: string;
}

export declare interface NavListProps {
    title?: string;
    children?: ReactNode;
}

/** Create and track Image URL for an uploaded file */
declare function objectUrl(file: Blob | MediaSource): string;

export declare const OutlineButton: default_2.FC<OutlineButtonProps>;

export declare interface OutlineButtonProps {
    type?: "submit" | "button" | "reset";
    href?: string;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
}

export declare interface Pair {
    key: string;
    value?: any;
}

export declare interface PluginInfo {
    loaded: string[];
    auth: AuthInfo;
    autoQuery: AutoQueryInfo;
    validation: ValidationInfo;
    sharpPages: SharpPagesInfo;
    requestLogs: RequestLogsInfo;
    profiling: ProfilingInfo;
    filesUpload: FilesUploadInfo;
    adminUsers: AdminUsersInfo;
    adminRedis: AdminRedisInfo;
    adminDatabase: AdminDatabaseInfo;
    meta: {
        [index: string]: string;
    };
}

/** Prettify & scrub an API JSON Response for human readability */
declare function prettyJson(o: any): string;

export declare function PreviewFormat(props: PreviewFormatProps): JSX.Element;

export declare interface PreviewFormatProps {
    value: any;
    format?: FormatInfo;
    includeIcon?: boolean;
    includeCount?: boolean;
    maxFieldLength?: number;
    maxNestedFields?: number;
    maxNestedFieldLength?: number;
}

export declare const PrimaryButton: default_2.FC<PrimaryButtonProps>;

export declare interface PrimaryButtonProps {
    type?: "submit" | "button" | "reset";
    href?: string;
    color?: "blue" | "purple" | "red" | "green" | "sky" | "cyan" | "indigo";
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
}

export declare interface ProfilingInfo {
    accessRole: string;
    defaultLimit: number;
    summaryFields: string[];
    tagLabel: string;
    meta: {
        [index: string]: string;
    };
}

/** Resolve {MetadataPropertyType} by Type and Property name */
declare function property(typeName: string, name: string): MetadataPropertyType;

/** Resolve allowable entries for property by {MetadataPropertyType} */
declare function propertyOptions(prop: MetadataPropertyType): {
    [name: string]: string;
};

declare function pushState(args: Record<string, any>, clear?: boolean): void;

export declare function QueryPrefs({ id, columns, prefs: prefsProp, maxLimit, onDone, onSave }: QueryPrefsProps): JSX.Element;

export declare interface QueryPrefsProps {
    id?: string;
    columns: MetadataPropertyType[];
    prefs: ApiPrefs;
    maxLimit?: number;
    onDone?: () => void;
    onSave?: (prefs: ApiPrefs) => void;
}

export declare interface RedisEndpointInfo {
    host: string;
    port: number;
    ssl?: boolean;
    db: number;
    username: string;
    password: string;
}

export declare interface RefInfo {
    model: string;
    selfId: string;
    refId: string;
    refLabel: string;
}

declare function registerInterceptor(key: string, callback: (key: string, value: any) => void): void;

/** Format Date as Relative Time from now */
declare function relativeTime(val: string | Date | number, rtf?: Intl.RelativeTimeFormat): string;

/** Format difference between dates as Relative Time */
declare function relativeTimeFromDate(d: Date, from?: Date): string;

/** Format time in ms as Relative Time from now */
declare function relativeTimeFromMs(elapsedMs: number, rtf?: Intl.RelativeTimeFormat): string;

export declare interface RequestLogsInfo {
    accessRole: string;
    requiredRoles: string[];
    requestLogger: string;
    defaultLimit: number;
    serviceRoutes: {
        [index: string]: string[];
    };
    meta: {
        [index: string]: string;
    };
}

export declare interface ResponseError {
    errorCode?: string;
    fieldName?: string;
    message?: string;
    meta?: {
        [index: string]: string;
    };
}

export declare interface ResponseStatus {
    errorCode?: string;
    message?: string;
    stackTrace?: string;
    errors?: ResponseError[];
    meta?: {
        [index: string]: string;
    };
}

export declare interface SchemaInfo {
    alias: string;
    name: string;
    tables: string[];
}

declare function scopedExpr(src: string, ctx: Record<string, any>): any;

export declare interface ScriptMethodType {
    name: string;
    paramNames: string[];
    paramTypes: string[];
    returnType: string;
}

/** Traverse object and replace API values with readable formatted values */
declare function scrub(o: any): any;

export declare const SecondaryButton: default_2.FC<SecondaryButtonProps>;

export declare interface SecondaryButtonProps {
    type?: "submit" | "button" | "reset";
    href?: string;
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
}

export declare const SelectInput: default_2.FC<SelectInputProps & default_2.HTMLAttributes<HTMLSelectElement>>;

export declare interface SelectInputProps {
    status?: ResponseStatus;
    id: string;
    value?: string;
    inputClass?: string;
    filterClass?: (cls: string) => string;
    label?: string;
    labelClass?: string;
    options?: any;
    values?: string[];
    entries?: {
        key: string;
        value: string;
    }[];
    onChange?: (value: string) => void;
}

declare function setAutoQueryGridDefaults(config: AutoQueryGridDefaults): void;

/** Set global configuration */
declare function setConfig(config: UiConfig): void;

/** Set default locale, number and Date formats */
declare function setDefaultFormats(newFormat: DefaultFormats): void;

/** Register additional formatters for use in <PreviewFormat /> */
declare function setFormatters(formatters: {
    [name: string]: Function;
}): void;

/** Explicitly set AppMetadata and save to localStorage */
declare function setMetadata(metadata: AppMetadata | null | undefined): boolean;

/** Set React ref or state value - for React compatibility, just sets the value directly */
declare function setRef<T>($ref: MutableRefObject<T> | ((value: T) => void), value: T): void;

export declare function SettingsIcons({ column, isOpen }: SettingsIconsProps): JSX.Element;

export declare interface SettingsIconsProps {
    column: Column;
    isOpen: boolean;
}

export declare interface SharpPagesInfo {
    apiPath: string;
    scriptAdminRole: string;
    metadataDebugAdminRole: string;
    metadataDebug?: boolean;
    spaFallback?: boolean;
    meta: {
        [index: string]: string;
    };
}

export declare const SidebarLayout: default_2.ForwardRefExoticComponent<SidebarLayoutProps & default_2.RefAttributes<SidebarLayoutRef>>;

declare interface SidebarLayoutProps {
    children?: ReactNode;
    mobileTitlebar?: ReactNode;
}

export declare interface SidebarLayoutRef {
    show(): void;
    hide(): void;
    toggle(show: boolean): void;
}

export declare const SignIn: default_2.FC<SignInProps>;

/** Sign In the currently Authenticated User */
declare function signIn(user: AuthenticateResponse): void;

export declare interface SignInProps {
    provider?: string;
    title?: string;
    tabs?: boolean | "false";
    oauth?: boolean | "false";
    onLogin?: (auth: AuthenticateResponse) => void;
}

/** Sign Out currently Authenticated User */
declare function signOut(): void;

export declare function SlideOver({ id, title, subtitle, contentClass, children, onDone }: SlideOverProps & {
    title?: ReactNode;
    subtitle?: ReactNode;
    footer?: ReactNode;
}): JSX.Element;

declare const slideOver: {
    panelClass: string;
    formClass: string;
    titlebarClass: string;
    headingClass: string;
    subHeadingClass: string;
    closeButtonClass: string;
};

export declare interface SlideOverProps {
    id?: string;
    title?: string;
    subtitle?: string;
    contentClass?: string;
    children?: ReactNode;
    onDone?: () => void;
}

/** Check if a supported HTML Input exists for {MetadataPropertyType} */
declare function supportsProp(prop?: MetadataPropertyType): boolean;

/** Convert SVG XML to data:image URL */
declare function svgToDataUri(svg: string): string;

declare function swrApi<TResponse>(client: JsonServiceClient, request: IReturn<TResponse> | ApiRequest, fn: (r: ApiResult_2<TResponse>) => void, args?: any, method?: string): Promise<ApiResult_2<any>>;

declare function swrCacheKey<TResponse>(request: IReturn<TResponse> | ApiRequest, args?: any): string;

declare function swrClear<TResponse>(options: {
    request: IReturn<TResponse> | ApiRequest;
    args?: any;
}): void;

export declare type TableStyle = "simple" | "fullWidth" | "stripedRows" | "whiteBackground" | "uppercaseHeadings" | "verticalLines";

export declare type TableStyleOptions = TableStyle | TableStyle[] | string;

export declare function Tabs(props: TabsProps): JSX.Element;

export declare interface TabsProps {
    tabs: {
        [name: string]: React.ComponentType;
    };
    id?: string;
    param?: string;
    label?: (tab: string) => string;
    selected?: string;
    tabClass?: string;
    bodyClass?: string;
    url?: boolean;
    clearQuery?: boolean;
}

export declare const TagInput: default_2.FC<TagInputProps & Omit<default_2.InputHTMLAttributes<HTMLInputElement>, keyof TagInputProps>>;

export declare interface TagInputProps {
    status?: ResponseStatus | null;
    id: string;
    type?: string;
    inputClass?: string;
    filterClass?: (cls: string) => string;
    label?: string;
    labelClass?: string;
    help?: string;
    value?: string | string[];
    delimiters?: string[];
    allowableValues?: string[];
    string?: boolean;
    maxVisibleItems?: number;
    converter?: (value: any) => string | string[];
    onChange?: (value: string | string[]) => void;
}

export declare const TextareaInput: default_2.FC<TextareaInputProps & default_2.HTMLAttributes<HTMLTextAreaElement>>;

export declare interface TextareaInputProps {
    status?: ResponseStatus | null;
    id: string;
    inputClass?: string;
    filterClass?: (cls: string) => string;
    label?: string;
    labelClass?: string;
    help?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
}

export declare const TextInput: default_2.ForwardRefExoticComponent<TextInputProps & default_2.HTMLAttributes<HTMLInputElement> & default_2.RefAttributes<TextInputRef>>;

export declare interface TextInputProps {
    status?: ResponseStatus | null;
    id: string;
    type?: string;
    inputClass?: string;
    filterClass?: (cls: string) => string;
    label?: string;
    labelClass?: string;
    help?: string;
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string | number) => void;
}

export declare interface TextInputRef {
    focus(): void;
}

declare function textInputValue(type: string, value: any): any;

export declare const TextLink: default_2.FC<TextLinkProps & default_2.AnchorHTMLAttributes<HTMLAnchorElement>>;

export declare interface TextLinkProps {
    color?: "blue" | "purple" | "red" | "green" | "sky" | "cyan" | "indigo";
    children?: ReactNode;
}

export declare interface ThemeInfo {
    form: string;
    modelIcon: ImageInfo;
}

/** Format duration in time format */
declare function time(o: any, attrs?: any): string;

/** Format TimeSpan or Date into required input[type=time] format */
declare function timeInputFormat(s?: string | number | Date | null): string;

/** Resolve Absolute URL from relative path */
declare function toAppUrl(url: string): string;

declare function toAuth(auth?: AuthenticateResponse): any;

/** Mutates Request DTO values to supported HTML Input values */
declare function toFormValues(dto: any, metaType?: MetadataType | null): any;

/** Update transition class based on Tailwind animation transition rule-set */
declare function transition(rule: TransitionRules, setTransition: (value: string) => void, show: boolean): void;

export declare type TransitionRule = {
    cls: string;
    from: string;
    to: string;
};

export declare type TransitionRules = {
    entering: TransitionRule;
    leaving: TransitionRule;
};

/** Truncate text that exceeds maxLength with an ellipsis */
declare function truncate(str: string, maxLength: number): string;

/** Metadata Types refer to same type */
declare function typeEquals(a?: MetadataType | MetadataTypeName | null, b?: MetadataType | MetadataTypeName | null): boolean;

declare function typeName(metaType?: MetadataTypeName): string;

/** @param {string} name
 * @param {string[]} genericArgs
 * @return {string}
 */
declare function typeName2(name: string, genericArgs?: string[]): string;

/**
 * Resolve {MetadataType} for DTO name
 * @param name        - Find MetadataType by name
 * @param [namespace] - Find MetadataType by name and namespace
 */
declare function typeOf(name?: string | null, namespace?: string | null): MetadataType;

/** Resolve {MetadataType} by {MetadataTypeName} */
declare function typeOfRef(ref?: {
    name: string;
    namespace?: string;
}): MetadataType;

/** Return all properties (inc. inherited) for {MetadataType} */
declare function typeProperties(type?: MetadataType | null): MetadataPropertyType[];

export declare interface UiConfig {
    redirectSignIn?: string;
    redirectSignOut?: string;
    navigate?: (url: string) => void;
    assetsPathResolver?: (src: string) => string;
    fallbackPathResolver?: (src: string) => string;
    apisResolver?: (type: string | null, metaTypes?: MetadataTypes | null) => AutoQueryApis | null;
    apiResolver?: (name: string) => MetadataOperationType | null;
    typeResolver?: (name: string, namespace?: string | null) => MetadataType | null;
    inputValue?: (type: string, value: any) => string | null;
    filterInputClass?: (cls: string, type: string) => string;
    autoQueryGridDefaults?: AutoQueryGridDefaults;
    storage?: Storage;
    tableIcon?: ImageInfo;
    scopeWhitelist?: {
        [k: string]: Function;
    };
}

export declare interface UiInfo {
    brandIcon: ImageInfo;
    hideTags: string[];
    modules: string[];
    alwaysHideTags: string[];
    adminLinks: LinkInfo[];
    theme: ThemeInfo;
    locode: LocodeUi;
    explorer: ExplorerUi;
    admin: AdminUi;
    defaultFormats: ApiFormat;
    meta: {
        [index: string]: string;
    };
}

declare function uniqueIgnoreCase(list: string[]): string[];

/** Returns a dto with all properties unwrapped - for React, just returns a shallow copy */
declare function unRefs<T extends Record<string, any>>(o: T): T;

export declare interface UploadedFile {
    fileName?: string;
    filePath?: string;
    contentType?: string;
    contentLength?: number;
}

export declare function useAuth(): {
    signIn: typeof signIn;
    signOut: typeof signOut;
    user: AuthenticateResponse;
    toAuth: typeof toAuth;
    isAuthenticated: boolean;
    hasRole: typeof hasRole;
    hasPermission: typeof hasPermission;
    isAdmin: typeof isAdmin;
    canAccess: typeof canAccess;
    invalidAccessMessage: typeof invalidAccessMessage;
};

export declare function useClient(use?: JsonServiceClient): ApiState;

/** Manage Global Configuration for Component Library */
export declare function useConfig(): {
    config: UiConfig;
    setConfig: typeof setConfig;
    events: {
        subscribe: (type: string, callback: Function) => {
            unsubscribe: () => void;
        };
        publish: (eventType: string, arg: any) => void;
    };
    autoQueryGridDefaults: AutoQueryGridDefaults;
    setAutoQueryGridDefaults: typeof setAutoQueryGridDefaults;
    assetsPathResolver: typeof assetsPathResolver;
    fallbackPathResolver: typeof fallbackPathResolver;
    registerInterceptor: typeof registerInterceptor;
};

export declare function useFiles(): {
    extSvg: typeof extSvg;
    extSrc: typeof extSrc;
    getExt: typeof getExt;
    encodeSvg: typeof encodeSvg;
    canPreview: typeof canPreview;
    getFileName: typeof getFileName;
    getMimeType: typeof getMimeType;
    formatBytes: typeof formatBytes;
    filePathUri: typeof filePathUri;
    svgToDataUri: typeof svgToDataUri;
    fileImageUri: typeof fileImageUri;
    objectUrl: typeof objectUrl;
    flush: typeof flush;
    inputFiles: typeof inputFiles;
    iconOnError: typeof iconOnError;
    iconFallbackSrc: typeof iconFallbackSrc;
};

export declare function useFormatters(): {
    Formats: typeof Formats;
    setDefaultFormats: typeof setDefaultFormats;
    getFormatters: typeof getFormatters;
    setFormatters: typeof setFormatters;
    formatValue: typeof formatValue;
    formatter: typeof formatter;
    dateInputFormat: typeof dateInputFormat;
    currency: typeof currency;
    bytes: typeof bytes;
    link: typeof link;
    linkTel: typeof linkTel;
    linkMailTo: typeof linkMailTo;
    icon: typeof icon;
    iconRounded: typeof iconRounded;
    attachment: typeof attachment;
    hidden: typeof hidden;
    time: typeof time;
    relativeTime: typeof relativeTime;
    relativeTimeFromDate: typeof relativeTimeFromDate;
    relativeTimeFromMs: typeof relativeTimeFromMs;
    enumFlags: typeof enumFlags;
    formatDate: typeof formatDate;
    formatNumber: typeof formatNumber;
    humanifyMs: typeof humanifyMs;
    humanifyNumber: typeof humanifyNumber;
    indentJson: typeof indentJson;
    prettyJson: typeof prettyJson;
    scrub: typeof scrub;
    truncate: typeof truncate;
    apiValueFmt: typeof apiValueFmt;
    iconOnError: typeof iconOnError;
};

export declare function useMetadata(): {
    loadMetadata: (args?: {
        olderThan?: number;
        resolvePath?: string;
        resolve?: () => Promise<Response>;
    }) => Promise<any>;
    getMetadata: typeof getMetadata;
    setMetadata: typeof setMetadata;
    clearMetadata: typeof clearMetadata;
    metadataApp: AppInfo;
    metadataApi: MetadataTypes;
    filterDefinitions: AutoQueryConvention[];
    typeOf: typeof typeOf;
    typeOfRef: typeof typeOfRef;
    typeEquals: typeof typeEquals;
    apiOf: typeof apiOf;
    findApis: typeof findApis;
    typeName: typeof typeName;
    typeName2: typeof typeName2;
    property: typeof property;
    enumOptions: typeof enumOptions;
    propertyOptions: typeof propertyOptions;
    createFormLayout: typeof createFormLayout;
    typeProperties: typeof typeProperties;
    supportsProp: typeof supportsProp;
    Crud: {
        Create: string;
        Update: string;
        Patch: string;
        Delete: string;
        AnyRead: string[];
        AnyWrite: string[];
        isAnyQuery: (op: MetadataOperationType) => any;
        isQuery: (op: MetadataOperationType) => any;
        isQueryInto: (op: MetadataOperationType) => any;
        isCrud: (op: MetadataOperationType) => boolean;
        isCreate: (op: MetadataOperationType) => boolean;
        isUpdate: (op: MetadataOperationType) => boolean;
        isPatch: (op: MetadataOperationType) => boolean;
        isDelete: (op: MetadataOperationType) => boolean;
        model: (type?: MetadataType | null) => string;
    };
    Apis: typeof Apis;
    getPrimaryKey: typeof getPrimaryKey;
    getPrimaryKeyByProps: typeof getPrimaryKeyByProps;
    getId: typeof getId;
    createDto: typeof createDto;
    makeDto: typeof makeDto;
    toFormValues: typeof toFormValues;
    formValues: typeof formValues;
    isComplexProp: typeof isComplexProp;
    asKvps: typeof asKvps;
    expandEnumFlags: typeof expandEnumFlags;
    enumFlagsConverter: typeof enumFlagsConverter;
};

export declare function useUtils(): {
    dateInputFormat: typeof dateInputFormat;
    dateTimeInputFormat: typeof dateTimeInputFormat;
    timeInputFormat: typeof timeInputFormat;
    textInputValue: typeof textInputValue;
    setRef: typeof setRef;
    unRefs: typeof unRefs;
    transition: typeof transition;
    focusNextElement: typeof focusNextElement;
    getTypeName: typeof getTypeName;
    htmlTag: typeof htmlTag;
    htmlAttrs: typeof htmlAttrs;
    linkAttrs: typeof linkAttrs;
    toAppUrl: typeof toAppUrl;
    isPrimitive: typeof isPrimitive;
    isComplexType: typeof isComplexType;
    pushState: typeof pushState;
    scopedExpr: typeof scopedExpr;
    copyText: typeof copyText;
    fromCache: typeof fromCache;
    swrCacheKey: typeof swrCacheKey;
    swrClear: typeof swrClear;
    swrApi: typeof swrApi;
    asStrings: typeof asStrings;
    asOptions: typeof asOptions;
    createDebounce: typeof createDebounce;
    delay: typeof delay;
    uniqueIgnoreCase: typeof uniqueIgnoreCase;
};

export declare interface ValidationInfo {
    hasValidationSource?: boolean;
    hasValidationSourceAdmin?: boolean;
    serviceRoutes: {
        [index: string]: string[];
    };
    typeValidators: ScriptMethodType[];
    propertyValidators: ScriptMethodType[];
    accessRole: string;
    meta: {
        [index: string]: string;
    };
}

export { }
