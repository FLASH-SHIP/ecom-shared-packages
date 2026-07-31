import type { Meta, StoryObj } from "@storybook/react";
import { AppleIcon } from "../components/icon-component/AppleIcon";
import { ArrowUpDownIcon } from "../components/icon-component/ArrowUpDownIcon";
import { ChevronLeftIcon } from "../components/icon-component/ChevronLeftIcon";
import { ChevronRightIcon } from "../components/icon-component/ChevronRightIcon";
import { ChevronsLeftIcon } from "../components/icon-component/ChevronsLeftIcon";
import { ChevronsRightIcon } from "../components/icon-component/ChevronsRightIcon";
import { CirclePlusIcon } from "../components/icon-component/CirclePlusIcon";
import { CloseIcon } from "../components/icon-component/CloseIcon";
import { ExportFileIcon } from "../components/icon-component/ExportFileIcon";
import { FacebookIcon } from "../components/icon-component/FacebookIcon";
import { FileInputIcon } from "../components/icon-component/FileInputIcon";
import { GoogleIcon } from "../components/icon-component/GoogleIcon";
import { ImportFileIcon } from "../components/icon-component/ImportFileIcon";
import { LayoutDashboardIcon } from "../components/icon-component/LayoutDashboardIcon";
import { MenuIcon } from "../components/icon-component/MenuIcon";
import { NotepadTextIcon } from "../components/icon-component/NotepadTextIcon";
import { PlusCircleIcon } from "../components/icon-component/PlusCircleIcon";
import { PrinterIcon } from "../components/icon-component/PrinterIcon";
import { SaveIcon } from "../components/icon-component/SaveIcon";
import { ServerCogIcon } from "../components/icon-component/ServerCogIcon";
import { SidebarToggleIcon } from "../components/icon-component/SidebarToggleIcon";
import { TelegramIcon } from "../components/icon-component/TelegramIcon";
import { ThreeDotsVerticalIcon } from "../components/icon-component/ThreeDotsVerticalIcon";
import { TopupIcon } from "../components/icon-component/TopupIcon";
import { TrashIcon } from "../components/icon-component/TrashIcon";
import { UserAvatarIcon } from "../components/icon-component/UserAvatarIcon";
import { WalletSolidIcon } from "../components/icon-component/WalletSolidIcon";
import { WhatsappIcon } from "../components/icon-component/WhatsappIcon";

const meta: Meta = {
  title: "Media/Custom Icons Gallery",
  parameters: {
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj;

const iconsList = [
  { name: "AppleIcon", Component: AppleIcon },
  { name: "ArrowUpDownIcon", Component: ArrowUpDownIcon },
  { name: "ChevronLeftIcon", Component: ChevronLeftIcon },
  { name: "ChevronRightIcon", Component: ChevronRightIcon },
  { name: "ChevronsLeftIcon", Component: ChevronsLeftIcon },
  { name: "ChevronsRightIcon", Component: ChevronsRightIcon },
  { name: "CirclePlusIcon", Component: CirclePlusIcon },
  { name: "CloseIcon", Component: CloseIcon },
  { name: "ExportFileIcon", Component: ExportFileIcon },
  { name: "FacebookIcon", Component: FacebookIcon },
  { name: "FileInputIcon", Component: FileInputIcon },
  { name: "GoogleIcon", Component: GoogleIcon },
  { name: "ImportFileIcon", Component: ImportFileIcon },
  { name: "LayoutDashboardIcon", Component: LayoutDashboardIcon },
  { name: "MenuIcon", Component: MenuIcon },
  { name: "NotepadTextIcon", Component: NotepadTextIcon },
  { name: "PlusCircleIcon", Component: PlusCircleIcon },
  { name: "PrinterIcon", Component: PrinterIcon },
  { name: "SaveIcon", Component: SaveIcon },
  { name: "ServerCogIcon", Component: ServerCogIcon },
  { name: "SidebarToggleIcon", Component: SidebarToggleIcon },
  { name: "TelegramIcon", Component: TelegramIcon },
  { name: "ThreeDotsVerticalIcon", Component: ThreeDotsVerticalIcon },
  { name: "TopupIcon", Component: TopupIcon },
  { name: "TrashIcon", Component: TrashIcon },
  { name: "UserAvatarIcon", Component: UserAvatarIcon },
  { name: "WalletSolidIcon", Component: WalletSolidIcon },
  { name: "WhatsappIcon", Component: WhatsappIcon },
];

export const Gallery: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">FlashShip Custom SVG Icons ({iconsList.length})</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Custom icon set exported directly from <code>@flash-ship/ecom-ui</code>.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {iconsList.map(({ name, Component }) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors shadow-xs group cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
              <Component className="size-6" />
            </div>
            <span className="text-xs font-mono text-muted-foreground mt-2 text-center truncate w-full">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
