import {createHash} from 'crypto';
import {NextRequest,NextResponse} from 'next/server';
import {createClient} from '@supabase/supabase-js';
import {z} from 'zod';
import {siteConfig} from '@/lib/site-config';
const attendanceSchema=z.enum(['yes','no','maybe']);
const attendanceShape=Object.fromEntries(siteConfig.events.map(e=>[e.id,attendanceSchema])) as Record<string,typeof attendanceSchema>;
const schema=z.object({name:z.string().trim().min(1).max(80),email:z.string().trim().email().max(160),guestCount:z.number().int().min(1).max(6),dietary:z.string().max(500).optional().default(''),note:z.string().max(1000).optional().default(''),website:z.string().max(0).optional().default(''),attendance:z.object(attendanceShape)});
export async function POST(req:NextRequest){
 const url=process.env.SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY,salt=process.env.RATE_LIMIT_SALT;
 if(!url||!key||!salt)return NextResponse.json({error:'RSVP is not configured yet.'},{status:503});
 let raw:unknown;try{raw=await req.json()}catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
 const parsed=schema.safeParse(raw);if(!parsed.success)return NextResponse.json({error:'Please check the form fields and try again.'},{status:400});
 if(parsed.data.website)return NextResponse.json({ok:true});
 const forwarded=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
 const ipHash=createHash('sha256').update(salt+':'+forwarded).digest('hex');
 const supabase=createClient(url,key,{auth:{persistSession:false}});
 const {data:allowed,error:rateError}=await supabase.rpc('check_rsvp_rate_limit',{p_ip_hash:ipHash});
 if(rateError)return NextResponse.json({error:'RSVP service is temporarily unavailable.'},{status:500});
 if(!allowed)return NextResponse.json({error:'Too many RSVP attempts. Please try again later.'},{status:429});
 const {name,email,guestCount,dietary,note,attendance}=parsed.data;
 const {error}=await supabase.from('rsvps').insert({name,email,guest_count:guestCount,dietary,note,attendance,environment:process.env.RSVP_ENV||'preview'});
 if(error)return NextResponse.json({error:'We could not save your RSVP. Please try again.'},{status:500});
 return NextResponse.json({ok:true});
}