// Icons that content (config/content.json / admin panel) can reference by name.
import {
  Gamepad2, Bot, Globe, Wrench, Palette, ServerCog, Zap, Heart, Users, Smartphone, Sparkles,
  MessagesSquare, FileText, Rocket, Check, Shield, Code2, Cpu, Database, Cloud, Layers, Lightbulb,
} from 'lucide-react';

export const icons = {
  Gamepad2, Bot, Globe, Wrench, Palette, ServerCog, Zap, Heart, Users, Smartphone, Sparkles,
  MessagesSquare, FileText, Rocket, Check, Shield, Code2, Cpu, Database, Cloud, Layers, Lightbulb,
};

export const iconNames = Object.keys(icons);

export const getIcon = (name) => icons[name] || Sparkles;
